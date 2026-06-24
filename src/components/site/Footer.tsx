import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';
import { MENTION_INDEPENDANCE, MARQUE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-white/80">
      <div className="container-r grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo dark />
          <p className="mt-4 text-sm text-white/60">
            L’audit 360° du restaurant : hygiène, RH, conformité, gestion et développement. Audit conseil privé et indépendant, partout en France.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">L’audit</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/#piliers" className="hover:text-orange">Les 10 piliers</Link></li>
            <li><Link href="/methode" className="hover:text-orange">Notre méthode</Link></li>
            <li><Link href="/pour-qui" className="hover:text-orange">Pour qui</Link></li>
            <li><Link href="/blog" className="hover:text-orange">Blog</Link></li>
            <li><Link href="/#tarifs" className="hover:text-orange">Tarifs</Link></li>
            <li><Link href="/#configurateur" className="hover:text-orange">Configurer mon audit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/contact" className="hover:text-orange">Nous contacter</Link></li>
            <li><a href={`mailto:${MARQUE.email}`} className="hover:text-orange">{MARQUE.email}</a></li>
            <li><Link href="/faq" className="hover:text-orange">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Légal</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/mentions-legales" className="hover:text-orange">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-orange">Confidentialité</Link></li>
            <li><Link href="/cgv" className="hover:text-orange">CGV</Link></li>
          </ul>
        </div>
      </div>

      {/* Qualiopi (formulation officielle obligatoire). */}
      <div className="border-t border-white/10">
        <div className="container-r flex flex-col items-start gap-3 py-6 sm:flex-row sm:items-center">
          <span className="inline-flex shrink-0 items-center rounded-lg bg-white px-3 py-2">
            <Image src="/qualiopi.png" alt="Certifié Qualiopi" width={633} height={338} className="h-9 w-auto" />
          </span>
          <p className="text-xs text-white/60">
            La certification qualité a été délivrée au titre de la catégorie : actions de formation.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-r flex flex-col gap-3 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} auditresto360. Tous droits réservés.</p>
          <p className="max-w-2xl">{MENTION_INDEPENDANCE}</p>
        </div>
      </div>
    </footer>
  );
}
