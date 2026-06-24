'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/** Barre d'appel à l'action collante (mobile), apparaît après défilement. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 backdrop-blur-md md:hidden">
      <div className="container-r flex items-center justify-between gap-3 py-3">
        <p className="text-sm font-semibold text-ink">Votre estimation en 1 min</p>
        <Link href="/#configurateur" className="btn-primary text-sm">
          Mon devis
        </Link>
      </div>
    </div>
  );
}
