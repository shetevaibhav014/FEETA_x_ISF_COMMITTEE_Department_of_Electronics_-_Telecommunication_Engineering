import { useState, useRef, useEffect, useCallback } from "react"

const photos = [
  {
    image: "/gallery/aluminimeet.jpeg",
    title: "Alumni Meet",
    category: "Event",
  },
  {
    image: "/gallery/java.jpeg",
    title: "SpringBoot Workshop",
    category: "Workshop",
  },
  {
    image: "/gallery/ppat.jpeg",
    title: "Pre-Placement Training",
    category: "Value Added Session",
  },
  {
    image: "/gallery/remote-sense.jpeg",
    title: "Remote Sensing Tech Session",
    category: "Workshop",
  },
  {
    image: "/gallery/ganesha.jpeg",
    title: "Ganesh Chaturthi 2024",
    category: "Cultural",
  },
  {
    image: "/gallery/Navratri.jpeg",
    title: "Navratri 2025",
    category: "Cultural",
  },
  {
    image: "/gallery/SIH.jpeg",
    title: "SIH 2025",
    category: "Technical",
  },
  {
    image: "/gallery/Compet.jpeg",
    title: "Project Expo",
    category: "Technical",
  },
  {
    image: "/gallery/seminar.jpeg",
    title: "Click to Connect",
    category: "Seminar",
  },
  {
    image: "/gallery/skynetra.jpeg",
    title: "Skynetra",
    category: "Event",
  },
  {
    image: "/gallery/vexpo.jpeg",
    title: "Vidharbha Expo",
    category: "Exhibition",
  },
  {
    image: "/gallery/waterpolo.jpeg",
    title: "Water Polo ",
    category: "Sports",
  },
  {
    image: "/gallery/unity.jpeg",
    title: "Batch 2024-28",
    category: "Students",
  },
  {
    image: "/gallery/we.jpeg",
    title: "Senior & Junior",
    category: "Interaction",
  },
  {
    image: "/gallery/alumini.jpeg",
    title: "Alumini Meet",
    category: "Interaction",
  },
  {
    image: "/gallery/faculty.jpeg",
    title: "Faculties",
    category: "Techno",
  },
  {
    image: "/gallery/squid.jpeg",
    title: "Squid Game",
    category: "Techno 2026",
  },
  {
    image: "/gallery/teacher.jpeg",
    title: " ",
    category: " ",
  },
  {
    image: "/gallery/f.jpeg",
    title: "Faculties",
    category: " ",
  },
  {
    image: "/gallery/techno.jpeg",
    title: "WE",
    category: "Techno 2026",
  },
  {
    image: "/gallery/bts.jpeg",
    title: "Behind the Scene",
    category: ".",
  },
];

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef(null)

  // Scroll to explicit index on dot click or auto-scroll step
  const scrollToIndex = useCallback((index) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const card = container.children[index]
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
      }
    }
  }, [])

  // Auto-scroll logic (every 3 seconds)
  useEffect(() => {
    if (isPaused || selectedIndex !== null) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % photos.length
        scrollToIndex(nextIndex)
        return nextIndex
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, selectedIndex, scrollToIndex])

  // Handle manual scroll sync with pagination dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollPosition = container.scrollLeft
      const cardWidth = container.firstElementChild?.offsetWidth || 300
      const newIndex = Math.round(scrollPosition / (cardWidth + 24)) // 24px gap
      setActiveIndex(Math.min(Math.max(newIndex, 0), photos.length - 1))
    }
  }

  // Manual scroll left/right actions
  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Keyboard navigation for full-screen preview modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  return (
    <section id="gallery" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Our Memories
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Forum
            <span className="text-blue-600"> Gallery</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Explore moments, activities, and memories from the ETC Department Forum.
          </p>
        </div>

        {/* Gallery Scroll Container (Pauses Auto-scroll on Hover/Touch) */}
        <div 
          className="relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {photos.map((photo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group relative h-80 min-w-[280px] max-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl snap-start focus:outline-none"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 pt-16">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                    {photo.category}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    {photo.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Navigation Controls & Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-6">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-slate-800 transition-all duration-200 hover:bg-slate-50 hover:shadow-lg active:scale-95"
            aria-label="Scroll left"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx)
                  scrollToIndex(idx)
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-slate-900"
                    : "w-3 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-slate-800 transition-all duration-200 hover:bg-slate-50 hover:shadow-lg active:scale-95"
            aria-label="Scroll right"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Image Preview Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Previous Image Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
            }}
            className="absolute left-4 sm:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div
            className="relative max-h-[90vh] max-w-5xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedIndex].image}
              alt={photos[selectedIndex].title}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl mx-auto"
            />

            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">
                {photos[selectedIndex].title}
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                {photos[selectedIndex].category}
              </p>
            </div>

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-900 shadow-lg transition hover:bg-red-500 hover:text-white"
              aria-label="Close image"
            >
              ×
            </button>
          </div>

          {/* Next Image Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
            }}
            className="absolute right-4 sm:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery