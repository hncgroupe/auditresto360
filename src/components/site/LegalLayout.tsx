export function LegalLayout({ titre, maj, children }: { titre: string; maj?: string; children: React.ReactNode }) {
  return (
    <section className="container-r py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tightest text-ink">{titre}</h1>
        {maj && <p className="mt-2 text-sm text-ink/50">Dernière mise à jour : {maj}</p>}
        <div className="legal mt-8 space-y-5 text-[15px] leading-relaxed text-ink/80">{children}</div>
      </div>
    </section>
  );
}
