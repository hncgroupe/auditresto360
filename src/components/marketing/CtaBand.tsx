import Link from 'next/link';
import { PaymentBadges } from './PaymentBadges';

export function CtaBand() {
  return (
    <section className="container-r py-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-white sm:px-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange/25 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tightest sm:text-4xl">
            Prêt à voir votre restaurant à 360° ?
          </h2>
          <p className="mt-3 text-lg text-white/75">
            Estimez votre audit en une minute. Devis personnalisé, sans engagement, paiement en plusieurs fois possible.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#configurateur" className="btn-primary">
              Estimer mon audit
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white/50">
              Parler à un auditeur
            </Link>
          </div>
          <div className="mt-8">
            <PaymentBadges light />
          </div>
        </div>
      </div>
    </section>
  );
}
