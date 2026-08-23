import { useState } from "react"

const events = [
  {
    date: "25",
    month: "AUG",
    title: "FORUM INSTALLATION",
    description:
      "To cultivate an innovative, student-driven community that empowers future engineers with industry-relevant skills, technical excellence, and leadership capabilities.",
    category: "Cultural",
  },
  {
    date: "...",
    month: "...",
    title: "Coming Soon",
    description:
      "Stay Tuned !!!!!!!!!!!!!!!",
    category: "Coming..............",
  },
  {
     date: "...",
    month: "...",
    title: "Coming Soon",
    description:
      "Stay Tuned !!!!!!!!!!!!!!!",
    category: "Coming..............",
  },
]

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <>
      <section
        id="events"
        className="bg-slate-950 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              What's Happening
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Upcoming
              <span className="text-blue-500"> Events</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Stay updated with the latest technical events,
              workshops, competitions and activities organized
              by the ETC Department Forum.
            </p>

          </div>

          {/* Events */}
          <div className="mx-auto mt-16 max-w-5xl space-y-6">

            {events.map((event) => (
              <div
                key={event.title}
                className="group flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 sm:flex-row sm:items-center"
              >

                {/* Date */}
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <span className="text-3xl font-bold">
                    {event.date}
                  </span>

                  <span className="text-sm font-semibold tracking-wider">
                    {event.month}
                  </span>
                </div>

                {/* Event Information */}
                <div className="flex-1">

                  <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    {event.category}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {event.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-400">
                    {event.description}
                  </p>

                </div>

                {/* View Details Button */}
                <button
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-blue-500 hover:bg-blue-600"
                >
                  View Details
                </button>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >

          <div
            className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xl text-slate-300 transition hover:bg-red-500 hover:text-white"
              aria-label="Close event details"
            >
              ×
            </button>

            {/* Event Category */}
            <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              {selectedEvent.category}
            </span>

            {/* Event Title */}
            <h3 className="mt-5 pr-10 text-3xl font-bold text-white">
              {selectedEvent.title}
            </h3>

            {/* Date */}
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-800 p-4">

              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-600 text-white">
                <span className="text-2xl font-bold">
                  {selectedEvent.date}
                </span>

                <span className="text-xs font-semibold">
                  {selectedEvent.month}
                </span>
              </div>

              <div>
                <p className="font-semibold text-white">
                  Event Date
                </p>

                <p className="text-sm text-slate-400">
                  {selectedEvent.date} {selectedEvent.month}
                </p>
              </div>

            </div>

            {/* Description */}
            <p className="mt-6 leading-7 text-slate-400">
              {selectedEvent.description}
            </p>

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Close
            </button>

          </div>

        </div>
      )}
    </>
  )
}

export default Events