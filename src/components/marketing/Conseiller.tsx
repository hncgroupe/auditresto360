'use client';

import Image from 'next/image';
import Link from 'next/link';

declare global {
  interface Window {
    Tawk_API?: { maximize?: () => void };
  }
}

/** Bloc humain : Franck répond aux questions. Ouvre le chat Tawk. */
export function Conseiller() {
  const openChat = () => {
    try {
      window.Tawk_API?.maximize?.();
    } catch {
      /* le widget se charge après hydratation */
    }
  };

  return (
    <section className="container-r py-16">
      <div className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-card">
        <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[0.55fr_1fr]">
          <div className="relative mx-auto w-full max-w-[260px]">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-ink/8 bg-orange-50">
              <Image src="/franck.png" alt="Franck, votre interlocuteur chez auditresto360" fill sizes="260px" className="object-cover" />
            </div>
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-card backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500" /> En ligne
            </span>
          </div>

          <div>
            <span className="eyebrow">Un humain, pas un robot</span>
            <h2 className="section-title mt-3">Une question ? Franck vous répond.</h2>
            <p className="mt-4 text-lg text-ink/75">
              Avant de vous engager, parlez à quelqu'un qui connaît le métier. Franck vous oriente sur la bonne formule, répond à vos questions et vous accompagne, simplement et sans jargon.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={openChat} className="btn-primary">
                Discuter maintenant
              </button>
              <Link href="/contact" className="btn-ghost">
                Nous écrire
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink/55">Réponse rapide, sans engagement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
