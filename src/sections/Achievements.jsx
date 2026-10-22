import React from "react";
import { useTheme } from "../context/ThemeContext";

const achievements = [
  {
    icon: "🏆",
    title: "Technical Competitions",
    description:
      "Students participate in technical competitions and demonstrate their skills, creativity and problem-solving abilities.",
  },
  {
    icon: "💡",
    title: "Innovative Projects",
    description:
      "Forum members work on innovative electronics, communication, embedded systems and software projects.",
  },
  {
    icon: "🥇",
    title: "Student Excellence",
    description:
      "Recognizing students for outstanding performance in academics, technical activities and extracurricular initiatives.",
  },
  {
    icon: "🚀",
    title: "Technical Growth",
    description:
      "Creating opportunities for students to develop practical skills and explore emerging technologies.",
  },
];

function Achievements() {
  const { isDark } = useTheme();

  return (
    <section
      id="achievements"
      className="px-6 py-28 transition-colors duration-300 relative bg-[var(--bg-page)] text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Auron Section Header */}
        <div className="section-header max-w-3xl mx-auto">
          <span className="section-subtitle">Our Achievements</span>

          <h2 className="section-title">
            Innovation & <span className="text-gold-gradient">Excellence</span>
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed transition-colors max-w-2xl mx-auto ${
              isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
            }`}
          >
            Celebrating the efforts, creativity and accomplishments of students
            from the ETC Department Forum.
          </p>
        </div>

        {/* Auron Glass Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="glass-card p-7 text-center group flex flex-col justify-between"
            >
              <div>
                {/* Icon */}
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl border transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-[#3b9cff15] border-[#3b9cff33] text-[#3b9cff] shadow-[0_0_15px_rgba(59,156,255,0.2)]"
                      : "bg-[#0d47a10f] border-[#0d47a126] text-[#0d47a1]"
                  }`}
                >
                  {achievement.icon}
                </div>

                {/* Title */}
                <h3
                  className="mt-6 text-xl font-bold font-heading transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
                >
                  {achievement.title}
                </h3>

                {/* Description */}
                <p
                  className={`mt-3 text-sm leading-relaxed transition-colors ${
                    isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
                  }`}
                >
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;