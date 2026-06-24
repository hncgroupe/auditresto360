'use client';

import { useMemo, useState } from 'react';
import {
  PROJETS,
  MODULES,
  TAILLES,
  NB_ETABLISSEMENTS,
  estimer,
  euros,
  labelProjet,
  labelTaille,
  labelNbEtab,
  labelsModules,
} from '@/lib/config';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gris/70 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20';

function Tuile({
  on,
  onClick,
  title,
  desc,
  check = false,
}: {
  on: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  check?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-left transition-all active:scale-[0.99] ${
        on ? 'border-orange bg-orange-50 ring-1 ring-orange/40' : 'border-ink/12 bg-white hover:border-orange/40'
      }`}
    >
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center ${check ? 'rounded' : 'rounded-full'} border ${
          on ? 'border-orange bg-orange text-white' : 'border-ink/25 bg-white'
        }`}
      >
        {on && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span>
        <span className="block text-sm font-semibold leading-tight text-ink">{title}</span>
        {desc && <span className="mt-0.5 block text-xs leading-snug text-ink/70">{desc}</span>}
      </span>
    </button>
  );
}

export function Configurateur() {
  const [step, setStep] = useState(1);

  const [projet, setProjet] = useState('');
  const [modules, setModules] = useState<string[]>(MODULES.map((m) => m.id)); // audit 360 complet par défaut
  const [taille, setTaille] = useState('');
  const [nbEtab, setNbEtab] = useState('1');

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ville, setVille] = useState('');
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const toggleModule = (id: string) =>
    setModules((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const allOn = modules.length === MODULES.length;
  const toggleAll = () => setModules(allOn ? [] : MODULES.map((m) => m.id));

  const estimation = useMemo(() => estimer({ projet, modules, taille, nbEtab }), [projet, modules, taille, nbEtab]);

  const TOTAL_STEPS = 5;
  const canNext =
    (step === 1 && !!projet) ||
    (step === 2 && modules.length > 0) ||
    (step === 3 && !!taille) ||
    step === 4;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom.trim() || !email.trim() || !telephone.trim()) {
      setStatus('error');
      setError('Nom, email et téléphone sont obligatoires.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setError('Merci de cocher le consentement pour être recontacté.');
      return;
    }
    setStatus('loading');
    setError('');

    const recap = [
      labelProjet(projet) ? `Projet : ${labelProjet(projet)}` : '',
      `Modules : ${labelsModules(modules).join(', ')}`,
      labelTaille(taille) ? `Taille : ${labelTaille(taille)}` : '',
      labelNbEtab(nbEtab) ? `Établissements : ${labelNbEtab(nbEtab)}` : '',
      estimation && !estimation.surDevis ? `Estimation : ${euros(estimation.min)} à ${euros(estimation.max)}` : 'Estimation : sur devis',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          ville,
          projet,
          modules,
          taille,
          nbEtablissements: nbEtab,
          estimationMin: estimation && !estimation.surDevis ? estimation.min : undefined,
          estimationMax: estimation && !estimation.surDevis ? estimation.max : undefined,
          message: recap,
          source: 'configurateur',
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

  return (
    <section id="configurateur" className="scroll-mt-24 bg-orange-50/40 py-16">
      <div className="container-r">
        <div className="max-w-2xl">
          <span className="eyebrow">Configurateur</span>
          <h2 className="section-title mt-3">Estimez votre audit en 1 minute</h2>
          <p className="mt-3 text-lg text-ink/75">
            Quatre questions, votre estimation s'affiche en direct. Le devis final reste personnalisé et sans engagement.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Wizard */}
          <div className="rounded-3xl border border-ink/8 bg-white p-5 shadow-card sm:p-7">
            {status === 'success' ? (
              <Success />
            ) : (
              <>
                <Progress step={step} total={TOTAL_STEPS} />

                {step === 1 && (
                  <Etape titre="Quel est votre projet ?">
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {PROJETS.map((p) => (
                        <Tuile key={p.id} on={projet === p.id} onClick={() => setProjet(p.id)} title={p.label} desc={p.desc} />
                      ))}
                    </div>
                  </Etape>
                )}

                {step === 2 && (
                  <Etape titre="Que voulez-vous auditer ?" hint="Tout est sélectionné par défaut (audit 360° complet).">
                    <button
                      type="button"
                      onClick={toggleAll}
                      className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        allOn ? 'border-orange bg-orange text-white' : 'border-ink/15 bg-white text-ink hover:border-orange/50'
                      }`}
                    >
                      {allOn ? 'Audit 360° complet sélectionné' : 'Tout sélectionner (audit 360° complet)'}
                    </button>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {MODULES.map((m) => (
                        <Tuile key={m.id} check on={modules.includes(m.id)} onClick={() => toggleModule(m.id)} title={m.label} desc={m.desc} />
                      ))}
                    </div>
                  </Etape>
                )}

                {step === 3 && (
                  <Etape titre="Quelle est la taille de l'établissement ?">
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {TAILLES.map((t) => (
                        <Tuile key={t.id} on={taille === t.id} onClick={() => setTaille(t.id)} title={t.label} desc={t.desc} />
                      ))}
                    </div>
                  </Etape>
                )}

                {step === 4 && (
                  <Etape titre="Combien d'établissements ?">
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {NB_ETABLISSEMENTS.map((n) => (
                        <Tuile key={n.id} on={nbEtab === n.id} onClick={() => setNbEtab(n.id)} title={n.label} desc={n.surDevis ? 'Étude dédiée sur devis' : undefined} />
                      ))}
                    </div>
                  </Etape>
                )}

                {step === 5 && (
                  <Etape titre="Recevez votre estimation détaillée">
                    <form onSubmit={submit} className="grid gap-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom *" className={inputCls} />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email *" className={inputCls} />
                        <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" placeholder="Téléphone *" className={inputCls} />
                        <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" className={inputCls} />
                      </div>
                      <label className="mt-1 flex items-start gap-3 text-sm text-ink/80">
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
                        {status === 'loading' ? 'Envoi…' : 'Recevoir mon estimation'}
                      </button>
                    </form>
                  </Etape>
                )}

                {step < 5 && (
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      className={`text-sm font-semibold text-ink/60 hover:text-ink ${step === 1 ? 'invisible' : ''}`}
                    >
                      ← Retour
                    </button>
                    <button
                      type="button"
                      disabled={!canNext}
                      onClick={() => setStep((s) => s + 1)}
                      className="btn-primary text-sm disabled:opacity-50"
                    >
                      Continuer
                    </button>
                  </div>
                )}
                {step === 5 && (
                  <button type="button" onClick={() => setStep(4)} className="mt-4 text-sm font-semibold text-ink/60 hover:text-ink">
                    ← Retour
                  </button>
                )}
              </>
            )}
          </div>

          {/* Récap estimation */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-ink text-white shadow-soft">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">Votre estimation</p>
                {estimation && !estimation.surDevis ? (
                  <>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold">{euros(estimation.min)}</span>
                      <span className="text-white/50">à</span>
                      <span className="text-3xl font-extrabold">{euros(estimation.max)}</span>
                    </div>
                    <p className="mt-1 text-xs text-white/50">HT, estimation indicative</p>
                  </>
                ) : (
                  <p className="mt-2 text-2xl font-bold">{estimation?.surDevis ? 'Sur devis' : 'À configurer'}</p>
                )}
              </div>
              <dl className="space-y-3 px-6 py-5 text-sm">
                <Row label="Projet" value={labelProjet(projet)} />
                <Row label="Périmètre" value={estimation?.complet ? 'Audit 360° complet' : modules.length ? `${modules.length} module(s)` : undefined} />
                <Row label="Taille" value={labelTaille(taille)} />
                <Row label="Établissements" value={labelNbEtab(nbEtab)} />
              </dl>
              {estimation?.complet && (
                <div className="mx-6 mb-4 rounded-xl bg-orange/15 px-4 py-2.5 text-xs font-semibold text-orange-200">
                  Tarif dégressif appliqué : audit 360° complet.
                </div>
              )}
            </div>
            <p className="mt-3 px-1 text-xs text-ink/60">
              Estimation indicative calculée à partir de vos réponses. Le devis final est établi après échange. Paiement possible en plusieurs fois. Audit conseil privé et indépendant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-semibold text-ink/60">
        <span>Étape {step} sur {total}</span>
        <span>{Math.round((step / total) * 100)} %</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-orange transition-all duration-300" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}

function Etape({ titre, hint, children }: { titre: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <h3 className="text-lg font-bold text-ink">{titre}</h3>
      {hint && <p className="mt-1 text-sm text-ink/60">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-white/50">{label}</dt>
      <dd className={`text-right font-medium ${value ? 'text-white' : 'text-white/30'}`}>{value ?? 'À choisir'}</dd>
    </div>
  );
}

function Success() {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange text-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink">Demande envoyée</h3>
      <p className="mx-auto mt-2 max-w-md text-ink/75">
        Merci. Nous vous recontactons rapidement avec votre estimation détaillée et les prochaines étapes pour planifier votre audit.
      </p>
    </div>
  );
}
