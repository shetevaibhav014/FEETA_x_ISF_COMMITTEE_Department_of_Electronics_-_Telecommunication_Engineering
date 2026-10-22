import React from "react";
import { useTheme } from "../context/ThemeContext";
import usePublicContent from "../hooks/usePublicContent";

function About() {
  const { isDark } = useTheme();
  const { items: aboutEntries } = usePublicContent("about");
  const { items: timelineEntries } = usePublicContent("timeline");
  const managedAbout = aboutEntries[0];

  return (
    <section
      id="about"
      className="px-6 py-28 transition-colors duration-300 relative bg-[var(--bg-page)] text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Auron Section Header */}
        <div className="section-header max-w-3xl mx-auto">
          <span className="section-subtitle">About Our Community</span>

          <h2 className="section-title">
            {managedAbout ? managedAbout.title : <>
            Empowering Students Through{" "}
            <span className="text-gold-gradient">
              Technology
            </span>
            </>}
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed transition-colors max-w-2xl mx-auto ${
              isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
            }`}
          >
            {managedAbout?.data.description || <>The ETC Department Forum is a student-driven platform that
            encourages innovation, technical learning, leadership and
            collaboration among Electronics and Telecommunication Engineering
            students.</>}
          </p>
        </div>

        {/* Auron Glass Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Innovation */}
          <div className="glass-card p-8 group">
            <div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border transition-all duration-300 group-hover:scale-110 ${
                isDark
                  ? "bg-[#3b9cff15] border-[#3b9cff33] text-[#3b9cff] shadow-[0_0_15px_rgba(59,156,255,0.2)]"
                  : "bg-[#0d47a10f] border-[#0d47a126] text-[#0d47a1]"
              }`}
            >
              💡
            </div>

            <h3
              className="text-xl font-bold font-heading mb-3 transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
            >
              Innovation
            </h3>

            <p
              className={`leading-relaxed text-sm sm:text-base transition-colors ${
                isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
              }`}
            >
              Encouraging students to explore new technologies, develop
              innovative ideas and turn concepts into real-world projects.
            </p>
          </div>

          {/* Technical Growth */}
          <div className="glass-card p-8 group">
            <div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border transition-all duration-300 group-hover:scale-110 ${
                isDark
                  ? "bg-[#3b9cff15] border-[#3b9cff33] text-[#3b9cff] shadow-[0_0_15px_rgba(59,156,255,0.2)]"
                  : "bg-[#0d47a10f] border-[#0d47a126] text-[#0d47a1]"
              }`}
            >
              ⚡
            </div>

            <h3
              className="text-xl font-bold font-heading mb-3 transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
            >
              Technical Growth
            </h3>

            <p
              className={`leading-relaxed text-sm sm:text-base transition-colors ${
                isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
              }`}
            >
              Conducting workshops, coding sessions, technical events and
              activities that help students build practical skills.
            </p>
          </div>

          {/* Leadership */}
          <div className="glass-card p-8 group">
            <div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border transition-all duration-300 group-hover:scale-110 ${
                isDark
                  ? "bg-[#3b9cff15] border-[#3b9cff33] text-[#3b9cff] shadow-[0_0_15px_rgba(59,156,255,0.2)]"
                  : "bg-[#0d47a10f] border-[#0d47a126] text-[#0d47a1]"
              }`}
            >
              🚀
            </div>

            <h3
              className="text-xl font-bold font-heading mb-3 transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
            >
              Leadership
            </h3>

            <p
              className={`leading-relaxed text-sm sm:text-base transition-colors ${
                isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
              }`}
            >
              Providing opportunities for students to organize, manage and lead
              departmental initiatives with confidence.
            </p>
          </div>
          {timelineEntries.length > 0 && (
            <ol className="mt-16 grid gap-5 border-l border-[var(--border-color)] pl-6 sm:grid-cols-2 lg:grid-cols-3">
              {timelineEntries.map((entry) => (
                <li key={entry.id} className="glass-card p-6">
                  <p className="text-sm font-semibold text-[var(--color-gold)]">{entry.data.date || entry.data.year || "Milestone"}</p>
                  <h3 className="mt-2 text-lg font-bold text-[var(--text-heading)]">{entry.title}</h3>
                  {entry.data.description && <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{entry.data.description}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;