'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gris/70 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20';

export function ContactForm() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ville, setVille] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom.trim() || !email.trim()) {
      setStatus('error');
      setError('Nom et email sont obligatoires.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setError('Merci de cocher le consentement pour être recontacté.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          ville,
          message,
          source: 'contact',
          website,
          consentementRGPD: 'true',
          consentementMarketing: marketing ? 'true' : '',
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

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-orange/30 bg-orange-50 p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-orange text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Message envoyé</h3>
        <p className="mt-2 text-ink/75">Merci, nous vous recontactons rapidement.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom *" className={inputCls} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email *" className={inputCls} />
        <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" placeholder="Téléphone" className={inputCls} />
        <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" className={inputCls} />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre projet, votre besoin…"
        rows={4}
        className={inputCls}
      />
      {/* Honeypot anti-spam (caché) */}
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-ink/30 text-orange focus:ring-orange" />
        <span>
          J'accepte d'être recontacté(e) par auditresto360. Voir la{' '}
          <a href="/confidentialite" className="text-orange-700 underline">politique de confidentialité</a>.
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 h-4 w-4 rounded border-ink/30 text-orange focus:ring-orange" />
        <span>J'accepte de recevoir des conseils et actualités (facultatif).</span>
      </label>
      {status === 'error' && <p className="text-sm font-medium text-red-600">{error}</p>}
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
        {status === 'loading' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>
      <p className="text-center text-xs text-ink/60">Réponse rapide. Sans engagement. Audit conseil privé et indépendant.</p>
    </form>
  );
}
