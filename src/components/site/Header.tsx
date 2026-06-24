'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

const NAV = [
  { href: '/#piliers', label: 'L’audit 360°' },
  { href: '/methode', label: 'Méthode' },
  { href: '/pour-qui', label: 'Pour qui' },
  { href: '/blog', label: 'Blog' },
  { href: '/#tarifs', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-ink/8 bg-white/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className={`container-r flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-[72px]'}`}>
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink/80 transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#configurateur" className="btn-primary text-sm">
            Mon devis
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/10 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink/8 bg-white md:hidden" aria-label="Navigation mobile">
          <div className="container-r flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-ink/80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
