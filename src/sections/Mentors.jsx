import React, { useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const mentorsData = [
  {
    name: "MR. CHAITYANYA WANKHEDE",
    position: "Mentor",
    year: "4th Year ",
    linkedin: "https://linkedin.com/in/mentor-one",
    image: "/mentors/m1.png",
  },
  {
    name: "MS. AYUSHI MANKAR",
    position: "Mentor",
    year: "4th Year ",
    linkedin: "https://linkedin.com/in/mentor-two",
    image: "/mentors/m2.png",
  },
  {
    name: "MR. SOUMYA BAWANE",
    position: "Mentor",
    year: "4th Year ",
    linkedin: "https://linkedin.com/in/mentor-three",
    image: "/mentors/m3.png",
  },
  {
    name: "MR. KRISH SALODE",
    position: "Mentor",
    year: "4th Year ",
    linkedin: "https://linkedin.com/in/mentor-four",
    image: "/mentors/m4.png",
  },
];

function Mentors() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % mentorsData.length;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + mentorsData.length) % mentorsData.length;
    scrollToCard(prevIdx);
  };

  return (
    <section
      id="mentors"
      className={`py-12 px-4 sm:py-16 sm:px-6 transition-colors duration-300 ${
        isDark ? "bg-[#050b18] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center">
          <p
            className={`mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] transition-colors ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            Guidance & Support
          </p>
          <h2
            className={`text-2xl font-bold tracking-tight sm:text-4xl transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Our Mentors
          </h2>
          <p
            className={`mt-2 text-xs sm:text-sm transition-colors ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Guiding light and leadership for the ETC forum
          </p>
        </div>

        {/* Scrollable Wrapper */}
        <div className="relative mt-8 sm:mt-12 w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex w-full overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-smooth py-4 no-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {mentorsData.map((mentor, index) => (
              <div
                key={index}
                className={`w-[80vw] sm:w-auto shrink-0 sm:shrink rounded-2xl p-6 shadow-md border text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isDark
                    ? "bg-slate-900/80 border-slate-800 text-white hover:border-cyan-500/50"
                    : "bg-white border-slate-100 text-slate-900 hover:border-blue-100"
                }`}
                style={{ scrollSnapAlign: "center" }}
              >
                {/* Mentor Photo */}
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className={`h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-sm mb-4 ring-4 ${
                    isDark ? "ring-cyan-500/20" : "ring-blue-50"
                  }`}
                />

                {/* Name & Details */}
                <h3
                  className={`text-base sm:text-lg font-bold transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {mentor.name}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    isDark ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  {mentor.position}
                </p>
                <p
                  className={`text-xs mt-1 transition-colors ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {mentor.year}
                </p>

                {/* Clickable LinkedIn Link */}
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 shadow-sm ${
                    isDark
                      ? "bg-slate-800 text-slate-300 hover:bg-cyan-600 hover:text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-blue-600 hover:text-white"
                  }`}
                  aria-label={`${mentor.name}'s LinkedIn Profile`}
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Controls (Visible on mobile/tablet) */}
        <div className="mt-4 sm:hidden flex justify-center items-center gap-3">
          <span
            onClick={handlePrev}
            className={`cursor-pointer text-2xl font-bold tracking-tighter transition-all duration-300 active:scale-90 select-none px-2 py-1 ${
              isDark
                ? "text-slate-400 hover:text-cyan-400"
                : "text-slate-500 hover:text-blue-600"
            }`}
            aria-label="Previous Mentors"
            role="button"
            tabIndex={0}
          >
            &lt;&lt;
          </span>

          <span
            className={`font-light tracking-tighter select-none ${
              isDark ? "text-slate-600" : "text-slate-300"
            }`}
          >
            • • • • •
          </span>

          <span
            onClick={handleNext}
            className={`cursor-pointer text-2xl font-bold tracking-tighter transition-all duration-300 active:scale-90 select-none px-2 py-1 ${
              isDark
                ? "text-slate-400 hover:text-cyan-400"
                : "text-slate-500 hover:text-blue-600"
            }`}
            aria-label="Next Mentors"
            role="button"
            tabIndex={0}
          >
            &gt;&gt;
          </span>
        </div>
      </div>
    </section>
  );
}

export default Mentors;