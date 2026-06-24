import Image from 'next/image';

const PAIEMENTS = [
  { src: '/logos/payment/visa.svg', alt: 'Visa' },
  { src: '/logos/payment/mastercard.svg', alt: 'Mastercard' },
  { src: '/logos/payment/amex.svg', alt: 'American Express' },
  { src: '/logos/payment/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/logos/payment/google-pay.svg', alt: 'Google Pay' },
  { src: '/logos/payment/klarna.svg', alt: 'Klarna' },
];

/** Bandeau moyens de paiement + paiement en plusieurs fois. */
export function PaymentBadges({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className={`text-xs font-semibold uppercase tracking-wide ${light ? 'text-white/60' : 'text-ink/55'}`}>
        Paiement sécurisé, en plusieurs fois possible
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {PAIEMENTS.map((p) => (
          <span key={p.alt} className="inline-flex h-7 items-center rounded-md bg-white px-2 shadow-sm ring-1 ring-ink/5">
            <Image src={p.src} alt={p.alt} width={40} height={24} className="h-5 w-auto" />
          </span>
        ))}
      </div>
    </div>
  );
}
