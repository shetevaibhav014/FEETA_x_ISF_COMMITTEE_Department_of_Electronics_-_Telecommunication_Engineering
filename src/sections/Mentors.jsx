import React, { useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

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
    <section id="mentors" className="bg-slate-50 py-12 px-4 sm:py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center">
          <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Guidance & Support
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Mentors
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
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
                className="w-[80vw] sm:w-auto shrink-0 sm:shrink bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ scrollSnapAlign: "center" }}
              >
                {/* Mentor Photo */}
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover ring-4 ring-blue-50 shadow-sm mb-4"
                />

                {/* Name & Details */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {mentor.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-blue-600">
                  {mentor.position}
                </p>
                <p className="text-xs text-slate-500 mt-1">{mentor.year}</p>

                {/* Clickable LinkedIn Link */}
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center h-10 w-10 rounded-full bg-slate-50 text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
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
            className="cursor-pointer text-2xl font-bold tracking-tighter text-slate-500 transition-all duration-300 hover:text-blue-600 active:scale-90 select-none px-2 py-1"
            aria-label="Previous Mentors"
            role="button"
            tabIndex={0}
          >
            &lt;&lt;
          </span>

          <span className="text-slate-300 font-light tracking-tighter select-none">
            • • • • •
          </span>

          <span
            onClick={handleNext}
            className="cursor-pointer text-2xl font-bold tracking-tighter text-slate-500 transition-all duration-300 hover:text-blue-600 active:scale-90 select-none px-2 py-1"
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