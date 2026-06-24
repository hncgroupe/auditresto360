import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { env } from '@/lib/env';
import { notifyTelegram, formatLeadMessage } from '@/lib/telegram';
import { sendTransactionalEmail, leadConfirmationEmail } from '@/lib/brevo';
import { euros, labelProjet, labelTaille, labelsModules } from '@/lib/config';

export const runtime = 'nodejs';

/**
 * Réception d'un lead (configurateur ou contact).
 * Flux : validation → DB → Telegram → email de confirmation.
 * Chaque effet de bord est protégé : un échec n'empêche pas les autres.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message ?? 'Données invalides.' }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot : on ignore silencieusement les bots.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  if (!data.consentementRGPD) {
    return NextResponse.json({ error: 'Le consentement est requis.' }, { status: 400 });
  }

  const estimation =
    data.estimationMin && data.estimationMax
      ? `${euros(data.estimationMin)} à ${euros(data.estimationMax)}`
      : null;

  // 1. Enregistrement en base (si configurée).
  if (env.isDatabaseConfigured) {
    try {
      const { prisma } = await import('@/lib/prisma');
      await prisma.lead.create({
        data: {
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          ville: data.ville,
          codePostal: data.codePostal,
          projet: data.projet,
          modules: data.modules,
          taille: data.taille,
          nbEtablissements: data.nbEtablissements,
          estimationMin: data.estimationMin,
          estimationMax: data.estimationMax,
          message: data.message,
          source: data.source ?? 'site',
          consentementRGPD: true,
          consentementAt: new Date(),
          consentementMarketing: Boolean(data.consentementMarketing),
        },
      });
    } catch (e) {
      console.error('[lead] échec enregistrement DB', e);
    }
  } else {
    console.warn('[lead] DATABASE_URL absent - lead non persisté (notifications uniquement).');
  }

  // 2. Notification Telegram (non bloquant).
  await notifyTelegram(
    formatLeadMessage({
      nom: data.nom,
      email: data.email,
      telephone: data.telephone ?? null,
      ville: [data.ville, data.codePostal].filter(Boolean).join(' ') || null,
      projet: labelProjet(data.projet) ?? null,
      modules: data.modules?.length ? labelsModules(data.modules) : null,
      taille: labelTaille(data.taille) ?? null,
      nbEtablissements: data.nbEtablissements ?? null,
      estimation,
      message: data.message ?? null,
    })
  ).catch(() => false);

  // 3. Email de confirmation au lead (non bloquant).
  const tpl = leadConfirmationEmail(data.nom);
  await sendTransactionalEmail({
    to: { email: data.email, name: data.nom },
    subject: tpl.subject,
    htmlContent: tpl.htmlContent,
  }).catch(() => false);

  return NextResponse.json({ ok: true });
}
