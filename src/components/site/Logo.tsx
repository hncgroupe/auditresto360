import Link from 'next/link';
import Image from 'next/image';

/**
 * Logo auditresto360.
 * - clair (défaut) : fichier de marque (orange + noir) sur fond clair.
 * - dark : wordmark texte (audit blanc + resto360 orange) pour fonds sombres,
 *   où le « audit » noir du logo serait invisible.
 */
export function Logo({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  if (dark) {
    return (
      <Link
        href="/"
        className={`inline-flex items-center text-2xl font-extrabold tracking-tightest ${className}`}
        aria-label="auditresto360, accueil"
      >
        <span className="text-white">audit</span>
        <span className="text-orange">resto360</span>
      </Link>
    );
  }
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="auditresto360, accueil">
      <Image
        src="/logo-auditresto360.png"
        alt="auditresto360"
        width={520}
        height={96}
        priority
        className="h-[30px] w-auto"
      />
    </Link>
  );
}
