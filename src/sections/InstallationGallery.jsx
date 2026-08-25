import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const installationPhotos = [
  { id: 1, image: "/installation-ceremony/a.jpeg", title: "Guests", category: "Installation - 2026" },
  { id: 2, image: "/installation-ceremony/y.jpeg", title: "Shanti Bhavan", category: "Installation - 2026" },
  { id: 3, image: "/installation-ceremony/warden.jpeg", title: "Committee", category: "Installation - 2026" },
  { id: 4, image: "/installation-ceremony/grp.jpeg", title: "FEETA x ISF", category: "Installation - 2026" },
  { id: 5, image: "/installation-ceremony/x.jpeg", title: "Event", category: "Installation - 2026" },
];

export default function InstallationGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Sync scroll position with active dot index
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

  // Keyboard navigation for Lightbox modal
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
    <section className="relative w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-10 overflow-x-hidden">
      
      {/* Light Theme Responsive Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-row items-center justify-between gap-4 z-10 mb-4 sm:mb-6">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-blue-600">
            Installation Ceremony
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-0.5 sm:mt-1">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Gallery</span>
          </h1>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all duration-300 shrink-0"
        >
          ← <span className="hidden xs:inline">Back to</span> Home
        </Link>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative my-auto w-full group">
        
        {/* Responsive Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 text-slate-800 border border-slate-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-xl text-xl"
        >
          ‹
        </button>

        {/* Responsive Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 text-slate-800 border border-slate-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-xl text-xl"
        >
          ›
        </button>

        {/* Responsive Horizontal Scroll Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x py-2 sm:py-4 px-4 sm:px-[5vw]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {installationPhotos.map((photo) => (
            <div
              key={photo.id}
              className="w-[85vw] xs:w-[75vw] sm:w-[50vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] snap-center px-2 sm:px-3 flex-shrink-0"
            >
              <div
                onClick={() => setActivePhoto(photo)}
                className="group relative h-[320px] xs:h-[360px] sm:h-[380px] md:h-[420px] lg:h-[460px] w-full cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-md transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Image */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Light-friendly Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Text Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-blue-900/60 border border-cyan-400/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full w-fit mb-1.5 sm:mb-2 backdrop-blur-sm">
                    {photo.category}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-md line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 z-10 mt-3 sm:mt-4">
        {installationPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 sm:h-2.5 transition-all duration-300 rounded-full ${
              activeIndex === index
                ? "w-6 sm:w-8 bg-gradient-to-r from-blue-600 to-cyan-600"
                : "w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Responsive Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/80 p-3 sm:p-6 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          {/* Close Modal Button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/20 text-white text-lg sm:text-xl hover:bg-white/30 transition-all z-10"
            aria-label="Close Preview"
          >
            ✕
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[90vh] text-center flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-h-[70vh] sm:max-h-[78vh] w-auto max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl mx-auto border border-slate-700"
            />
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-bold text-white tracking-wide">
              {activePhoto.title}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}