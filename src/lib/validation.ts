import { z } from 'zod';

/** Coercition checkbox HTML ("true" / "on" / boolean / undefined). */
const checkbox = z
  .union([z.literal('true'), z.literal('on'), z.boolean(), z.undefined()])
  .transform((v) => v === true || v === 'true' || v === 'on');

/** "" ou null → undefined avant validation. */
const blankToUndef = (v: unknown) => (v === '' || v === null ? undefined : v);

function optString(max: number) {
  return z.preprocess(blankToUndef, z.string().trim().max(max).optional());
}
function optInt() {
  return z.preprocess(blankToUndef, z.coerce.number().int().min(0).max(10_000_000).optional());
}

export const leadSchema = z.object({
  nom: z.string().trim().min(1, 'Nom requis').max(120),
  email: z.string().trim().email('Email invalide').max(160),
  telephone: optString(40),
  ville: optString(120),
  codePostal: optString(10),

  projet: z.preprocess(
    blankToUndef,
    z.enum(['EXPLOITATION', 'LANCEMENT', 'REPRISE', 'GROUPE']).optional()
  ),
  modules: z.preprocess(
    (v) => (Array.isArray(v) ? v : v == null ? [] : [v]),
    z.array(z.string().max(40)).max(20)
  ),
  taille: optString(20),
  nbEtablissements: optString(10),
  estimationMin: optInt(),
  estimationMax: optInt(),

  message: optString(2000),
  source: optString(60),

  consentementRGPD: checkbox,
  consentementMarketing: checkbox,
  // Honeypot anti-spam : doit rester vide.
  website: z.preprocess(blankToUndef, z.string().max(0).optional()),
});

export type LeadInput = z.infer<typeof leadSchema>;
