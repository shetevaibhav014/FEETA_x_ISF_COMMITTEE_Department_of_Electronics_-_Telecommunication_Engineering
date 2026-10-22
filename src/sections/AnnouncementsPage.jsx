import usePublicContent from "../hooks/usePublicContent";

export default function AnnouncementsPage() {
  const { items: announcements } = usePublicContent("announcements");
  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        <p className="section-subtitle">Stay informed</p>
        <h1 className="section-title">Announcements</h1>
        <div className="mt-12 divide-y divide-[var(--border-color)]">
          {announcements.map((entry) => (
            <article key={entry.id} className="py-7 first:pt-0">
              {entry.data.pinned && <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">Pinned</p>}
              <h2 className="text-xl font-bold text-[var(--text-heading)]">{entry.title}</h2>
              {entry.data.description && <p className="mt-2 max-w-3xl leading-relaxed text-[var(--text-secondary)]">{entry.data.description}</p>}
              {entry.data.url && <a className="mt-3 inline-block font-semibold text-[var(--color-gold)]" href={entry.data.url} target="_blank" rel="noreferrer">More details →</a>}
            </article>
          ))}
        </div>
        {!announcements.length && <p className="mt-8 text-[var(--text-muted)]">No current announcements.</p>}
      </div>
    </section>
  );
}
