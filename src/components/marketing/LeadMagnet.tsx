'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LEAD_MAGNET } from '@/lib/constants';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30';

const AVANTAGES = [
  'Voir à quoi ressemble la notation par pilier',
  'Comprendre comment sont présentés les points critiques',
  'Découvrir le plan d’action priorisé',
];

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setError('Merci d’indiquer votre email.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setError('Merci de cocher le consentement.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: email.split('@')[0],
          email,
          message: `Demande : ${LEAD_MAGNET.titre}`,
          source: 'lead-magnet',
          website,
          consentementRGPD: 'true',
          consentementMarketing: 'true',
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Une erreur est survenue.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  return (
    <section id="exemple-rapport" className="container-r scroll-mt-24 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-white sm:px-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/25 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-orange-400">
              Gratuit
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tightest sm:text-4xl">
              Recevez un exemple de rapport d’audit
            </h2>
            <p className="mt-3 max-w-lg text-lg text-white/75">
              Découvrez concrètement ce que vous remet auditresto360 avant même de réserver. Notation, points critiques, plan d’action : tout y est.
            </p>
            <ul className="mt-6 space-y-2.5">
              {AVANTAGES.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-white/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-white">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur">
            {status === 'success' ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-orange text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold">C’est noté</h3>
                {LEAD_MAGNET.fileUrl ? (
                  <>
                    <p className="mt-2 text-sm text-white/75">Votre exemple est prêt.</p>
                    <a href={LEAD_MAGNET.fileUrl} target="_blank" rel="noopener" className="btn-primary mt-4 inline-flex">
                      Télécharger le PDF
                    </a>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-white/75">Nous vous envoyons l’exemple de rapport par email très vite.</p>
                )}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Image src="/img/audit-tablette.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                  <p className="text-sm font-semibold text-white">{LEAD_MAGNET.titre}</p>
                </div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Votre email professionnel" className={inputCls} />
                <input value={website} onChange={(e) => setWebsite(e.target.value)} name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <label className="flex items-start gap-3 text-xs text-white/70">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/30 text-orange focus:ring-orange" />
                  <span>
                    J’accepte de recevoir le document et des conseils par email. Voir la{' '}
                    <a href="/confidentialite" className="text-orange-300 underline">politique de confidentialité</a>.
                  </span>
                </label>
                {status === 'error' && <p className="text-sm font-medium text-red-300">{error}</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'loading' ? 'Envoi…' : 'Recevoir l’exemple'}
                </button>
                <p className="text-center text-[11px] text-white/45">Gratuit, sans engagement.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
