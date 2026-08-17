import React from "react"

const activities = [
  {
    icon: "💻",
    title: "Technical Workshops",
    description:
      "Hands-on workshops where students learn emerging technologies and practical engineering skills.",
  },
  {
    icon: "🤖",
    title: "Projects & Innovation",
    description:
      "Encouraging students to build innovative hardware and software projects and solve real-world problems.",
  },
  {
    icon: "🏆",
    title: "Technical Competitions",
    description:
      "Coding competitions, quizzes, problem-solving challenges and other technical contests.",
  },
  {
    icon: "🎤",
    title: "Expert Sessions",
    description:
      "Interactive sessions with professionals, alumni and experts from the technology industry.",
  },
  {
    icon: "🔧",
    title: "Hands-on Sessions",
    description:
      "Practical learning through electronics, embedded systems, IoT and other engineering activities.",
  },
  {
    icon: "🚀",
    title: "Student Initiatives",
    description:
      "Creating opportunities for students to collaborate, lead events and turn their ideas into reality.",
  },
]

export default function Activities() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            What We Do
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Activities
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-8 text-slate-400">
            From technical workshops to competitions and innovation projects, the ETC Forum provides students with opportunities to learn, build, and lead.
          </p>
        </div>

        {/* Activity Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-transform duration-300 group-hover:scale-110">
                {activity.icon}
              </div>
              <h2 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-cyan-400">
                {activity.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-400 text-sm sm:text-base">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}