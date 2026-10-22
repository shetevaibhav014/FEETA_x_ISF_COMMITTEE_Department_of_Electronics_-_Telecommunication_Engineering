import usePublicContent from "../hooks/usePublicContent";

export default function ResourcesPage() {
  const { items: resources } = usePublicContent("resources");
  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="section-subtitle">ETC Forum</p>
        <h1 className="section-title">Resources & links</h1>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((entry) => (
            <article className="glass-card p-6" key={entry.id}>
              <h2 className="text-xl font-bold text-[var(--text-heading)]">{entry.title}</h2>
              {entry.data.description && <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{entry.data.description}</p>}
              {entry.data.url && <a className="mt-5 inline-flex font-semibold text-[var(--color-gold)]" href={entry.data.url} target="_blank" rel="noreferrer">Open resource <span className="ml-2">↗</span></a>}
            </article>
          ))}
        </div>
        {!resources.length && <p className="mt-8 text-[var(--text-muted)]">Resources will appear here when published.</p>}
      </div>
    </section>
  );
}
