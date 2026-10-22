import React from "react";
import { useTheme } from "../context/ThemeContext";

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
];

export default function Activities() {
  const { isDark } = useTheme();

  return (
    <section
      id="activities"
      className="px-6 py-28 transition-colors duration-300 relative bg-[var(--bg-page-alt)] text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Auron Section Header */}
        <div className="section-header max-w-3xl mx-auto">
          <span className="section-subtitle">What We Do</span>

          <h2 className="section-title">
            Our <span className="text-gold-gradient">Activities</span>
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed transition-colors max-w-2xl mx-auto ${
              isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
            }`}
          >
            From technical workshops to competitions and innovation projects,
            the ETC Forum provides students with opportunities to learn, build,
            and lead.
          </p>
        </div>

        {/* Auron Glass Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="glass-card p-8 group flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div
                  aria-hidden="true"
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-[#3b9cff15] border-[#3b9cff33] text-[#3b9cff] shadow-[0_0_15px_rgba(59,156,255,0.2)]"
                      : "bg-[#0d47a10f] border-[#0d47a126] text-[#0d47a1]"
                  }`}
                >
                  {activity.icon}
                </div>

                <h3
                  className="text-xl font-bold font-heading mb-3 transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
                >
                  {activity.title}
                </h3>

                <p
                  className={`text-sm sm:text-base leading-relaxed transition-colors ${
                    isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
                  }`}
                >
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}