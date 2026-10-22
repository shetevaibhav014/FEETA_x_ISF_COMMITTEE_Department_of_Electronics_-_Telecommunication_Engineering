import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const installationPhotos = [
  { id: 1, image: "/installation-ceremony/a.jpeg", title: "Guests & Honored Dignitaries", category: "Installation - 2026", date: "AUG 25, 2026" },
  { id: 2, image: "/installation-ceremony/y.jpeg", title: "Shanti Bhavan Auditorium", category: "Installation - 2026", date: "AUG 25, 2026" },
  { id: 3, image: "/installation-ceremony/warden.jpeg", title: "Committee - 2026", category: "Installation - 2026", date: "AUG 25, 2026" },
  { id: 4, image: "/installation-ceremony/grp.jpeg", title: "FEETA x ISF", category: "Installation - 2026", date: "AUG 25, 2026" },
  { id: 5, image: "/installation-ceremony/x.jpeg", title: "Ceremonial Inauguration", category: "Installation - 2026", date: "AUG 25, 2026" },
];

export default function InstallationGallery() {
  const { isDark } = useTheme();
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % installationPhotos.length;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? installationPhotos.length - 1 : activeIndex - 1;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activePhoto) return;
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowLeft") {
        const currentIdx = installationPhotos.findIndex((p) => p.id === activePhoto.id);
        const prevIdx = currentIdx === 0 ? installationPhotos.length - 1 : currentIdx - 1;
        setActivePhoto(installationPhotos[prevIdx]);
      }
      if (e.key === "ArrowRight") {
        const currentIdx = installationPhotos.findIndex((p) => p.id === activePhoto.id);
        const nextIdx = (currentIdx + 1) % installationPhotos.length;
        setActivePhoto(installationPhotos[nextIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto]);

  return (
    <section
      className={`relative w-full min-h-screen flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-[#030712] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Light / Dark Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] ${
            isDark ? "bg-cyan-950/40" : "bg-blue-200/60"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-[140px] ${
            isDark ? "bg-blue-950/30" : "bg-indigo-100/70"
          }`}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px] ${
            isDark ? "bg-cyan-900/30" : "bg-sky-200/60"
          }`}
        />
        <div
          className={`absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] ${
            isDark
              ? "bg-[linear-gradient(to_right,#1e293b50_1px,transparent_1px),linear-gradient(to_bottom,#1e293b50_1px,transparent_1px)] bg-[size:4rem_4rem]"
              : "bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem]"
          }`}
        />
      </div>

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-row items-center justify-between gap-4 z-10 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full animate-pulse ${
                isDark ? "bg-cyan-400" : "bg-blue-600"
              }`}
            />
            <p
              className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] transition-colors ${
                isDark ? "text-cyan-400" : "text-blue-600"
              }`}
            >
              Installation Ceremony
            </p>
          </div>
          <h1
            className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mt-1 transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Event{" "}
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent"
              }
            >
              Gallery
            </span>
          </h1>
        </div>

        <Link
          to="/"
          className={`group relative inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all duration-300 shadow-md shrink-0 overflow-hidden border ${
            isDark
              ? "text-slate-300 bg-slate-900/80 border-slate-700 hover:border-cyan-400 hover:text-cyan-300 shadow-black/50"
              : "text-slate-700 bg-white/80 border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-slate-200/50"
          }`}
        >
          ← <span className="hidden xs:inline">Back to</span> Home
        </Link>
      </div>

      {/* Horizontal Interactive Carousel Container */}
      <div className="relative my-auto w-full group/carousel z-10">
        {/* Navigation Buttons (Desktop) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className={`absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 text-2xl font-bold border ${
            isDark
              ? "bg-slate-900/90 text-cyan-400 border-slate-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500"
              : "bg-white/90 text-blue-600 border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
          }`}
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className={`absolute right-4 lg:left-auto lg:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 text-2xl font-bold border ${
            isDark
              ? "bg-slate-900/90 text-cyan-400 border-slate-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500"
              : "bg-white/90 text-blue-600 border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
          }`}
        >
          ›
        </button>

        {/* Responsive Horizontal Scroll Strip */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x py-6 px-4 sm:px-[6vw] gap-4 sm:gap-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {installationPhotos.map((photo) => (
            <div
              key={photo.id}
              className="w-[85vw] xs:w-[70vw] sm:w-[48vw] md:w-[36vw] lg:w-[26vw] xl:w-[22vw] snap-center flex-shrink-0"
            >
              <div
                onClick={() => setActivePhoto(photo)}
                className={`group relative h-[340px] xs:h-[380px] sm:h-[400px] md:h-[440px] lg:h-[480px] w-full cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-slate-900 border-slate-800 shadow-lg shadow-black/50 hover:border-cyan-500 hover:shadow-cyan-500/20"
                    : "bg-white border-slate-200/80 shadow-lg shadow-slate-200/60 hover:border-blue-400 hover:shadow-blue-500/15"
                }`}
              >
                {/* Photo */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Light Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 group-hover:ring-blue-500/30 rounded-2xl transition-all" />

                {/* Card Meta Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 bg-white/95 border border-blue-200 px-2.5 py-1 rounded-md shadow-sm">
                      {photo.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 font-medium">
                      {photo.date}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md group-hover:text-blue-200 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="flex justify-center items-center gap-2 z-10 mt-2 sm:mt-4">
        {installationPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 transition-all duration-300 rounded-full ${
              activeIndex === index
                ? isDark
                  ? "w-8 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md shadow-cyan-500/30"
                  : "w-8 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/30"
                : isDark
                ? "w-2 bg-slate-700 hover:bg-slate-600"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/80 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActivePhoto(null)}
        >
          {/* Close Modal Button */}
          <button
            onClick={() => setActivePhoto(null)}
            className={`absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full text-lg border transition-all z-20 shadow-xl ${
              isDark
                ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-cyan-600 hover:text-white"
                : "bg-white text-slate-700 border-slate-200 hover:bg-blue-600 hover:text-white"
            }`}
            aria-label="Close Preview"
          >
            ✕
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative p-1.5 rounded-2xl border shadow-2xl ${
                isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
              }`}
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full rounded-xl object-contain mx-auto"
              />
            </div>
            <div className="mt-4 flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-sm">
                {activePhoto.category}
              </span>
              <p
                className={`text-lg sm:text-xl font-bold tracking-wide px-4 py-1 rounded-lg border backdrop-blur-sm shadow-sm mt-1 ${
                  isDark
                    ? "text-white bg-slate-900/90 border-slate-700"
                    : "text-slate-900 bg-white/80 border-slate-200/60"
                }`}
              >
                {activePhoto.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}