/**
 * Accès centralisé aux variables d'environnement (lues depuis .env.local).
 * Aucune clé requise ne casse le build : on logue si absente.
 */

function opt(key: string): string | undefined {
  const v = process.env[key];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  siteUrl: opt('NEXT_PUBLIC_SITE_URL') ?? 'https://auditresto360.fr',

  // Telegram
  telegramBotToken: opt('TELEGRAM_BOT_TOKEN'),
  telegramChatId: opt('TELEGRAM_CHAT_ID'),

  // Brevo
  brevoApiKey: opt('BREVO_API_KEY'),
  brevoSenderEmail: opt('BREVO_SENDER_EMAIL') ?? 'contact@auditresto360.fr',
  brevoSenderName: opt('BREVO_SENDER_NAME') ?? 'auditresto360',

  // Vérification moteurs de recherche
  googleSiteVerification: opt('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'),
  bingSiteVerification: opt('NEXT_PUBLIC_BING_SITE_VERIFICATION'),

  /** true si la base est configurée (sinon notifications seules). */
  get isDatabaseConfigured() {
    return Boolean(opt('DATABASE_URL'));
  },
};
