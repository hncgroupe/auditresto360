'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/faq';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="container-r scroll-mt-24 py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">Questions fréquentes</span>
        <h2 className="section-title mt-3">Tout ce que vous voulez savoir</h2>
      </div>
      <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/8 bg-white">
        {FAQ_ITEMS.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-ink">{it.q}</span>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/60 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {isOpen && <p className="px-5 pb-5 text-sm text-ink/75 sm:px-6">{it.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
