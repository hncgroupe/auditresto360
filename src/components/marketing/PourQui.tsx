import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/site/Reveal';

export const CIBLES = [
  {
    id: 'independant',
    titre: 'Restaurateur indépendant',
    img: '/img/chef.jpg',
    desc: 'Vous gérez seul votre établissement et voulez un diagnostic complet pour gagner en sérénité et en marge.',
    points: ['Diagnostic 360° de votre restaurant', 'Priorités claires, sans jargon', 'Plan d’action réaliste à votre rythme'],
  },
  {
    id: 'ouverture',
    titre: 'Ouverture / création',
    img: '/img/cuisine-propre.jpg',
    desc: 'Vous lancez un restaurant. Cadrez l’hygiène, l’organisation et la rentabilité avant le jour J.',
    points: ['Mise en conformité avant ouverture', 'Process et organisation posés dès le départ', 'Carte et food cost optimisés'],
  },
  {
    id: 'reprise',
    titre: 'Reprise / rachat',
    img: '/img/audit-tablette.jpg',
    desc: 'Vous reprenez un fonds. Sachez exactement ce que vous achetez avant de signer.',
    points: ['Audit avant rachat (forces et risques)', 'État réel de la conformité et des équipes', 'Leviers de redressement chiffrés'],
  },
  {
    id: 'groupe',
    titre: 'Groupe & franchise',
    img: '/img/controle-cover.webp',
    desc: 'Vous pilotez plusieurs établissements ou un réseau. Harmonisez les standards et sécurisez la marque.',
    points: ['Audit multi-sites homogène', 'Référentiel commun et notation comparable', 'Suivi du réseau et des franchisés'],
  },
];

export function PourQui() {
  return (
    <section id="pour-qui" className="container-r scroll-mt-24 py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">Pour qui</span>
        <h2 className="section-title mt-3">Un audit adapté à votre situation</h2>
        <p className="mt-3 text-lg text-ink/75">
          Indépendant, créateur, repreneur ou groupe : le périmètre et la profondeur de l’audit s’ajustent à votre projet.
        </p>
      </div>
      <div className="mt-9 grid gap-4 md:grid-cols-2">
        {CIBLES.map((c, i) => (
          <Reveal key={c.id} delay={i * 60}>
            <div className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={c.img} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" aria-hidden="true" />
                <h3 className="absolute bottom-3 left-4 text-lg font-bold text-white">{c.titre}</h3>
              </div>
              <div className="flex flex-1 flex-col p-6">
              <p className="text-sm text-ink/70">{c.desc}</p>
              <ul className="mt-4 space-y-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/#configurateur" className="mt-auto pt-5 inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800">
                Estimer cet audit →
              </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
