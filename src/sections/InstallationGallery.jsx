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
    <section className="relative w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between pt-28 pb-10 overflow-x-hidden">
      
      {/* Light Theme Header */}
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between z-10 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Installation Ceremony
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Gallery</span>
          </h1>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative my-auto w-full group">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-800 border border-slate-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-xl"
        >
          ‹
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-800 border border-slate-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-xl"
        >
          ›
        </button>

        {/* Horizontal Scroll Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x py-4 px-[5vw]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {installationPhotos.map((photo) => (
            <div
              key={photo.id}
              className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[32vw] snap-center px-3 flex-shrink-0"
            >
              <div
                onClick={() => setActivePhoto(photo)}
                className="group relative h-[45vh] min-h-[340px] max-h-[480px] w-full cursor-pointer overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md transition-all duration-500 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
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
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-blue-900/60 border border-cyan-400/30 px-2.5 py-1 rounded-full w-fit mb-2 backdrop-blur-sm">
                    {photo.category}
                  </span>
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 z-10 mt-2">
        {installationPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 transition-all duration-300 rounded-full ${
              activeIndex === index
                ? "w-8 bg-gradient-to-r from-blue-600 to-cyan-600"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          {/* Close Modal Button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white text-xl hover:bg-white/30 transition-all"
            aria-label="Close Preview"
          >
            ✕
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl mx-auto border border-slate-700"
            />
            <p className="mt-4 text-lg font-bold text-white tracking-wide">
              {activePhoto.title}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}