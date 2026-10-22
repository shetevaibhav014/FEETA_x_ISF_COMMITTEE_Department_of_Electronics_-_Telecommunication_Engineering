import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import usePublicContent from "../hooks/usePublicContent";

/* eslint-disable react/only-export-components */
export const events = [
  {
    id: "forum-installation",
    date: "25",
    month: "AUG",
    title: "Forum Installation",
    description:
      "To cultivate an innovative, student-driven community that empowers future engineers with industry-relevant skills, technical excellence, and leadership capabilities.",
    category: "Cultural",
    isAvailable: true,
  },
  {
    id: "engineering-day",
    date: "TBD",
    month: "SEPT",
    title: "Engineering Day",
    description:
      "To celebrate engineering ingenuity while building a collaborative ecosystem where aspiring technologists innovate, build, and lead.",
    category: "Technical",
    isAvailable: true,
  },
  {
    id: "coming-soon",
    date: "TBA",
    month: "TBA",
    title: "Upcoming Community Event",
    description:
      "We are currently finalizing details for our next major technical activity. Check back soon for registration info!",
    category: "Upcoming",
    isAvailable: false,
  },
];
/* eslint-enable react/only-export-components */

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isDark } = useTheme();
  const { items: managedEvents, initialized } = usePublicContent("events");
  const managedEventCards = managedEvents.map((item) => {
      const dateValue = item.data.date || "";
      const parsedDate = new Date(dateValue);
      const hasFullDate = /^\d{4}-\d{2}-\d{2}/.test(dateValue) && !Number.isNaN(parsedDate.valueOf());
      return {
        id: item.id,
        title: item.title,
        date: hasFullDate ? String(parsedDate.getDate()) : dateValue || "TBD",
        month: hasFullDate ? parsedDate.toLocaleString("en", { month: "short" }).toUpperCase() : item.data.month || "TBA",
        description: item.data.description || "",
        category: item.data.category || "Event",
        venue: item.data.venue || "",
        poster: item.data.poster || item.data.image || "",
        registrationLink: item.data.registrationLink || "",
        isAvailable: Boolean(item.data.registrationLink || item.data.isAvailable),
      };
    });
  const managedTitles = new Set(managedEventCards.map((event) => event.title.toLowerCase()));
  const visibleEvents = initialized ? managedEventCards : [
    ...events.filter((event) => !managedTitles.has(event.title.toLowerCase())),
    ...managedEventCards,
  ];

  // Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    if (selectedEvent) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

  return (
    <>
      <section
        id="events"
        className="px-6 py-28 transition-colors duration-300 relative bg-[var(--bg-page)] text-[var(--text-primary)]"
      >
        <div className="mx-auto max-w-7xl">
          {/* Auron Section Header */}
          <div className="section-header max-w-3xl mx-auto">
            <span className="section-subtitle">What's Happening</span>

            <h2 className="section-title">
              Upcoming <span className="text-gold-gradient">Events</span>
            </h2>

            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed transition-colors max-w-2xl mx-auto ${
                isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
              }`}
            >
              Stay updated with the latest technical events, workshops,
              competitions, and activities organized by the ETC Department Forum.
            </p>
          </div>

          {/* Events List as Glass Cards */}
          <div className="mx-auto mt-16 max-w-5xl space-y-6">
            {visibleEvents.map((event) => (
              <div
                key={event.id}
                className="glass-card flex flex-col gap-6 p-6 sm:flex-row sm:items-center justify-between group"
              >
                {/* Date Badge */}
                <div className="flex h-22 w-22 sm:h-24 sm:w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-[var(--gold-gradient)] text-white shadow-md">
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {event.date}
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase">
                    {event.month}
                  </span>
                </div>

                {/* Event Information */}
                <div className="flex-1">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase border ${
                      isDark
                        ? "bg-[#3b9cff15] text-[#3b9cff] border-[#3b9cff33]"
                        : "bg-[#0d47a10f] text-[#0d47a1] border-[#0d47a126]"
                    }`}
                  >
                    {event.category}
                  </span>

                  <h3
                    className="mt-3 text-2xl font-bold font-heading transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
                  >
                    {event.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm sm:text-base leading-relaxed transition-colors ${
                      isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
                    }`}
                  >
                    {event.description}
                  </p>
                </div>

                {/* View Details / Disabled Button */}
                <div className="shrink-0">
                  {event.isAvailable ? (
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="cta-button"
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="cursor-not-allowed rounded-full border px-6 py-3 text-xs uppercase tracking-wider font-bold opacity-60 border-[var(--border-color)] text-[var(--text-muted)]"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6 backdrop-blur-md"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="glass-card relative w-full max-w-lg p-8 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-lg transition hover:bg-red-500 hover:text-white"
              aria-label="Close event details"
            >
              ×
            </button>

            {/* Event Category */}
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                isDark
                  ? "bg-[#3b9cff15] text-[#3b9cff] border-[#3b9cff33]"
                  : "bg-[#0d47a10f] text-[#0d47a1] border-[#0d47a126]"
              }`}
            >
              {selectedEvent.category}
            </span>

            {/* Event Title */}
            <h3 className="mt-5 pr-10 text-3xl font-bold font-heading text-[var(--text-heading)]">
              {selectedEvent.title}
            </h3>

            {/* Date Details */}
            <div
              className="mt-6 flex items-center gap-4 rounded-2xl p-4 border border-[var(--border-color)] bg-[var(--bg-card)]"
            >
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--gold-gradient)] text-white">
                <span className="font-heading text-xl font-bold">{selectedEvent.date}</span>
                <span className="text-xs font-semibold">{selectedEvent.month}</span>
              </div>

              <div>
                <p className="font-semibold font-heading text-[var(--text-heading)]">
                  Event Date
                </p>
                <p className={`text-sm ${isDark ? "text-[#abc4e3]" : "text-[#4a5568]"}`}>
                  {selectedEvent.date === "TBD" || selectedEvent.date === "TBA"
                    ? "Date to be announced"
                    : `${selectedEvent.date} ${selectedEvent.month}`}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className={`mt-6 leading-relaxed ${isDark ? "text-[#abc4e3]" : "text-[#4a5568]"}`}>
              {selectedEvent.description}
            </p>
            {selectedEvent.venue && <p className="mt-4 text-sm text-[var(--text-muted)]">Venue: {selectedEvent.venue}</p>}
            {selectedEvent.poster && <img className="mt-5 max-h-64 w-full rounded-xl object-cover" src={selectedEvent.poster} alt={selectedEvent.title} />}
            {selectedEvent.registrationLink && <a className="cta-button mt-6 inline-flex" href={selectedEvent.registrationLink} target="_blank" rel="noreferrer">Register for this event <span>→</span></a>}

            {/* Close Modal CTA */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="cta-button mt-8 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Events;