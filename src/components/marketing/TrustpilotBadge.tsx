import Image from 'next/image';
import { TRUSTPILOT } from '@/lib/constants';

/**
 * Badge Trustpilot : note réelle + étoiles + logo.
 * nbAvis et url sont affichés seulement s'ils sont renseignés (no-fake-content).
 */
export function TrustpilotBadge({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const note = TRUSTPILOT.note.toLocaleString('fr-FR', { minimumFractionDigits: 1 });
  const txt = light ? 'text-white' : 'text-ink';
  const sub = light ? 'text-white/60' : 'text-ink/55';

  const inner = (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/trustpilot-stars.png" alt="" width={120} height={24} className="h-5 w-auto" />
      <span className={`text-sm font-bold ${txt}`}>{note}/5</span>
      <Image src="/trustpilot-logo.png" alt="Trustpilot" width={90} height={22} className="h-4 w-auto" />
      {TRUSTPILOT.nbAvis ? (
        <span className={`text-xs ${sub}`}>{TRUSTPILOT.nbAvis} avis</span>
      ) : null}
    </span>
  );

  if (TRUSTPILOT.url) {
    return (
      <a href={TRUSTPILOT.url} target="_blank" rel="noopener" className={`inline-flex ${className}`} aria-label={`Note ${note} sur 5 sur Trustpilot`}>
        {inner}
      </a>
    );
  }
  return <span className={`inline-flex ${className}`}>{inner}</span>;
}
