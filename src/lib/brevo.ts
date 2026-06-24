import { env } from './env';

/** Email transactionnel via l'API Brevo. Échec non bloquant. */
interface SendEmailParams {
  to: { email: string; name?: string } | { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  /** Pièces jointes par URL publique (Brevo les télécharge et les joint). */
  attachments?: { url: string; name: string }[];
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
        ...(params.attachments?.length
          ? { attachment: params.attachments.map((a) => ({ url: a.url, name: a.name })) }
          : {}),
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

/** Email de confirmation envoyé au lead après une demande. Design HTML compatible email (tables + styles inline). */
export function leadConfirmationEmail(nom: string): { subject: string; htmlContent: string } {
  const logo = `${env.siteUrl}/logo-auditresto360.png`;
  const prenom = escapeHtml(nom.split(' ')[0] || nom);

  const piliers = [
    'Hygiène & HACCP',
    'Conformité',
    'Cuisine & production',
    'Ressources humaines',
    'Gestion & food cost',
    'Carte & commercial',
  ]
    .map(
      (p) =>
        `<span style="display:inline-block;margin:0 6px 8px 0;padding:6px 12px;background:#FFF4EA;border:1px solid #FFE6CC;border-radius:999px;font-size:13px;color:#C25500;font-weight:600;">${p}</span>`
    )
    .join('');

  const etapes = [
    ['1', 'On vous rappelle', 'Un auditeur vous contacte pour préciser votre besoin et confirmer le devis.'],
    ['2', 'Audit sur place', 'Visite de votre établissement, observation, mesures et entretien dirigeant.'],
    ['3', 'Rapport & plan d’action', 'Notation par pilier, points critiques et actions priorisées, débriefés avec vous.'],
  ]
    .map(
      ([n, t, d]) => `
      <tr>
        <td valign="top" style="width:44px;padding:0 0 18px 0;">
          <table cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:34px;height:34px;background:#FF7A00;border-radius:50%;color:#ffffff;font-weight:800;font-size:15px;text-align:center;line-height:34px;font-family:Arial,Helvetica,sans-serif;">${n}</td></tr></table>
        </td>
        <td valign="top" style="padding:0 0 18px 8px;">
          <div style="font-size:15px;font-weight:700;color:#0A0A0A;">${t}</div>
          <div style="font-size:14px;color:#52525B;margin-top:2px;line-height:1.5;">${d}</div>
        </td>
      </tr>`
    )
    .join('');

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
  <body style="margin:0;padding:0;background:#F4F4F5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F5;padding:28px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px -10px rgba(10,10,10,0.18);">

          <!-- En-tete logo -->
          <tr><td style="padding:30px 32px 6px 32px;" align="center">
            <img src="${logo}" alt="auditresto360" height="42" style="height:42px;width:auto;border:0;display:inline-block;margin:0 auto;">
          </td></tr>

          <!-- Bandeau confirmation -->
          <tr><td style="padding:24px 32px 0 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(120deg,#0A0A0A 0%,#1C1C1C 100%);background-color:#0A0A0A;border-radius:14px;">
              <tr><td style="padding:22px 24px;">
                <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#FF9226;">Demande bien reçue</div>
                <div style="font-size:24px;font-weight:800;color:#ffffff;margin-top:6px;line-height:1.2;">Merci ${prenom}, on s'occupe de votre restaurant.</div>
              </td></tr>
            </table>
          </td></tr>

          <!-- Corps -->
          <tr><td style="padding:26px 32px 8px 32px;font-family:'Poppins',Arial,Helvetica,sans-serif;color:#0A0A0A;">
            <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#3F3F46;">
              Votre demande auprès d'<strong style="color:#0A0A0A;">auditresto360</strong> est enregistrée. Un membre de notre équipe revient vers vous très vite avec votre devis personnalisé et les prochaines étapes.
            </p>

            <div style="font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#C25500;margin:22px 0 14px 0;">Ce qui se passe maintenant</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${etapes}</table>

            <div style="height:1px;background:#EDEDF0;margin:8px 0 22px 0;"></div>

            <div style="font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#C25500;margin-bottom:12px;">L'audit 360° couvre tout votre restaurant</div>
            <div>${piliers}</div>

            <!-- CTA -->
            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:28px auto 6px auto;"><tr>
              <td style="background:#FF7A00;border-radius:999px;" align="center">
                <a href="${env.siteUrl}/#configurateur" style="display:inline-block;padding:13px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">Voir mon estimation</a>
              </td>
            </tr></table>
          </td></tr>

          <!-- Footer -->
          <tr><td style="padding:18px 32px 30px 32px;">
            <div style="height:1px;background:#EDEDF0;margin-bottom:18px;"></div>
            <p style="margin:0 0 8px 0;font-size:13px;color:#52525B;">
              Une question ? Écrivez-nous : <a href="mailto:contact@auditresto360.fr" style="color:#C25500;text-decoration:none;font-weight:600;">contact@auditresto360.fr</a>
            </p>
            <p style="margin:0;font-size:11px;line-height:1.6;color:#9AA1AB;">
              auditresto360 est un audit conseil privé et indépendant. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires/DDPP. auditresto360 n'est pas assujetti à la TVA (art. 293 B du CGI).
            </p>
          </td></tr>

        </table>
        <div style="font-size:11px;color:#B4B4BD;margin-top:16px;font-family:Arial,Helvetica,sans-serif;">© auditresto360 - auditresto360.fr</div>
      </td></tr>
    </table>
  </body></html>`;

  return {
    subject: `Merci ${prenom}, votre demande d'audit est bien reçue`,
    htmlContent,
  };
}

/** Email du lead magnet : envoi de l'exemple de rapport (en pièce jointe + lien). */
export function leadMagnetEmail(downloadUrl?: string): { subject: string; htmlContent: string } {
  const logo = `${env.siteUrl}/logo-auditresto360.png`;
  const cta = downloadUrl
    ? `<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:22px auto 4px auto;"><tr><td style="background:#FF7A00;border-radius:999px;" align="center"><a href="${downloadUrl}" style="display:inline-block;padding:13px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">Télécharger l'exemple de rapport</a></td></tr></table>`
    : '';
  return {
    subject: 'Votre exemple de rapport auditresto360',
    htmlContent: `
  <!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#F4F4F5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F5;padding:28px 12px;"><tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px -10px rgba(10,10,10,0.18);">
        <tr><td style="padding:30px 32px 6px 32px;" align="center"><img src="${logo}" alt="auditresto360" height="42" style="height:42px;width:auto;border:0;display:inline-block;"></td></tr>
        <tr><td style="padding:18px 32px 8px 32px;font-family:'Poppins',Arial,Helvetica,sans-serif;color:#0A0A0A;" align="center">
          <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#C25500;">Votre document</div>
          <h1 style="font-size:24px;font-weight:800;margin:8px 0 0 0;">Voici votre exemple de rapport</h1>
          <p style="font-size:15px;line-height:1.6;color:#3F3F46;margin:14px 0 0 0;">${downloadUrl ? "Vous trouverez l'exemple de rapport d'audit en pièce jointe et via le bouton ci-dessous." : "Nous vous adressons l'exemple de rapport d'audit très prochainement."} Il vous montre la notation par pilier, les points critiques et le plan d'action que vous remet auditresto360.</p>
          ${cta}
          <p style="font-size:14px;line-height:1.6;color:#3F3F46;margin:18px 0 0 0;">Envie d'un audit de votre établissement ? Estimez-le en une minute.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:14px auto 4px auto;"><tr><td style="border:1.5px solid #FF7A00;border-radius:999px;" align="center"><a href="${env.siteUrl}/#configurateur" style="display:inline-block;padding:11px 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#C25500;text-decoration:none;">Estimer mon audit</a></td></tr></table>
        </td></tr>
        <tr><td style="padding:16px 32px 28px 32px;"><div style="height:1px;background:#EDEDF0;margin-bottom:16px;"></div>
          <p style="margin:0;font-size:11px;line-height:1.6;color:#9AA1AB;">auditresto360 est un audit conseil privé et indépendant. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires/DDPP.</p>
        </td></tr>
      </table>
    </td></tr></table>
  </body></html>`,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
