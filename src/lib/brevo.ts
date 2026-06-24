import { env } from './env';

/** Email transactionnel via l'API Brevo. Échec non bloquant. */
interface SendEmailParams {
  to: { email: string; name?: string } | { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
}

export async function sendTransactionalEmail(params: SendEmailParams): Promise<boolean> {
  if (!env.brevoApiKey) {
    console.warn('[brevo] API key manquante - email ignoré.');
    return false;
  }
  const to = Array.isArray(params.to) ? params.to : [params.to];
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.brevoApiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: env.brevoSenderEmail, name: env.brevoSenderName },
        to,
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    });
    if (!res.ok) {
      console.error('[brevo] échec envoi', await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[brevo] exception', e);
    return false;
  }
}

/** Email de confirmation envoyé au lead après une demande. */
export function leadConfirmationEmail(nom: string): { subject: string; htmlContent: string } {
  return {
    subject: 'Votre demande d’audit auditresto360 a bien été reçue',
    htmlContent: `
      <div style="font-family: 'Poppins', Arial, sans-serif; color: #0A0A0A; max-width: 560px; margin: auto;">
        <div style="padding: 8px 0 16px;">
          <span style="font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">
            <span style="color:#0A0A0A;">audit</span><span style="color:#FF7A00;">resto360</span>
          </span>
        </div>
        <h2 style="color: #0A0A0A;">Merci ${escapeHtml(nom)},</h2>
        <p>Votre demande auprès d'<strong>auditresto360</strong> est bien enregistrée.
        Un membre de notre équipe vous recontacte rapidement pour préciser le périmètre et vous envoyer un devis personnalisé.</p>
        <p>Notre audit 360° passe en revue tout votre restaurant :</p>
        <ul>
          <li>Hygiène, HACCP et conformité réglementaire</li>
          <li>Cuisine, réserve et performance opérationnelle</li>
          <li>Ressources humaines et organisation</li>
          <li>Gestion, comptabilité, food cost et marges</li>
          <li>Carte, expérience client et développement commercial</li>
        </ul>
        <p>Vous recevez ensuite un rapport clair : notation par pilier, points critiques et plan d'action priorisé.</p>
        <p style="color: #6B7280; font-size: 13px;">auditresto360 est un audit conseil privé et indépendant.
        Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires/DDPP.</p>
      </div>
    `,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
