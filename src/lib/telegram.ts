import { env } from './env';

/** Notification Telegram. Échec non bloquant (retour boolean). */
export async function notifyTelegram(message: string): Promise<boolean> {
  if (!env.telegramBotToken || !env.telegramChatId) {
    console.warn('[telegram] token ou chat_id manquant - notification ignorée.');
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.telegramChatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error('[telegram] échec envoi', await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[telegram] exception', e);
    return false;
  }
}

/** Message formaté pour un nouveau lead auditresto360. */
export function formatLeadMessage(lead: {
  nom: string;
  email?: string | null;
  telephone?: string | null;
  ville?: string | null;
  projet?: string | null;
  formule?: string | null;
  taille?: string | null;
  nbEtablissements?: string | null;
  estimation?: string | null;
  message?: string | null;
}): string {
  return [
    '🟠 <b>Nouveau lead - auditresto360</b>',
    `👤 ${lead.nom}`,
    lead.email ? `✉️ ${lead.email}` : null,
    lead.telephone ? `📞 ${lead.telephone}` : null,
    lead.ville ? `📍 ${lead.ville}` : null,
    lead.projet ? `🎯 ${lead.projet}` : null,
    lead.formule ? `📦 ${lead.formule}` : null,
    lead.taille ? `🍽️ ${lead.taille}` : null,
    lead.nbEtablissements ? `🏢 ${lead.nbEtablissements} établissement(s)` : null,
    lead.estimation ? `💶 ${lead.estimation}` : null,
    lead.message ? `📝 ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
