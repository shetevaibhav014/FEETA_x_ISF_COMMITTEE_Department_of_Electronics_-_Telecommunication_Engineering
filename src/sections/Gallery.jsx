import { useState, useRef, useEffect, useCallback } from "react"
import { useTheme } from "../context/ThemeContext"
import usePublicContent from "../hooks/usePublicContent"

/* eslint-disable react/only-export-components */
export const photos = [
  { image: "/gallery/aluminimeet.jpeg", title: "Alumni Meet", category: "Event" },
  { image: "/gallery/java.jpeg", title: "SpringBoot Workshop", category: "Workshop" },
  { image: "/gallery/ppat.jpeg", title: "Pre-Placement Training", category: "Value Added Session" },
  { image: "/gallery/remote-sense.jpeg", title: "Remote Sensing Tech Session", category: "Workshop" },
  { image: "/gallery/ganesha.jpeg", title: "Ganesh Chaturthi 2024", category: "Cultural" },
  { image: "/gallery/Navratri.jpeg", title: "Navratri 2025", category: "Cultural" },
  { image: "/gallery/SIH.jpeg", title: "SIH 2025", category: "Technical" },
  { image: "/gallery/Compet.jpeg", title: "Project Expo", category: "Technical" },
  { image: "/gallery/seminar.jpeg", title: "Click to Connect", category: "Seminar" },
  { image: "/gallery/skynetra.jpeg", title: "Skynetra", category: "Event" },
  { image: "/gallery/vexpo.jpeg", title: "Vidharbha Expo", category: "Exhibition" },
  { image: "/gallery/waterpolo.jpeg", title: "Water Polo", category: "Sports" },
  { image: "/gallery/unity.jpeg", title: "Batch 2024-28", category: "Students" },
  { image: "/gallery/we.jpeg", title: "Senior & Junior", category: "Interaction" },
  { image: "/gallery/alumini.jpeg", title: "Alumni Meet", category: "Interaction" },
  { image: "/gallery/faculty.jpeg", title: "Faculties", category: "Techno" },
  { image: "/gallery/squid.jpeg", title: "Squid Game", category: "Techno 2026" },
  { image: "/gallery/teacher.jpeg", title: "Faculty Members", category: "Department" },
  { image: "/gallery/f.jpeg", title: "Faculties", category: "Department" },
  { image: "/gallery/techno.jpeg", title: "WE", category: "Techno 2026" },
  { image: "/gallery/bts.jpeg", title: "Behind the Scenes", category: "Highlights" },
]
/* eslint-enable react/only-export-components */

function Gallery() {
  const { isDark } = useTheme()
  const { items: galleryItems, initialized } = usePublicContent("gallery")
  const managedGalleryPhotos = galleryItems.map((item) => ({
      image: item.data.image || item.data.poster || "",
      title: item.title,
      category: item.data.category || item.data.album || "Gallery",
      alt: item.data.alt || item.title,
    })).filter((item) => item.image)
  const managedTitles = new Set(managedGalleryPhotos.map((photo) => photo.title.toLowerCase()))
  const galleryPhotos = initialized ? managedGalleryPhotos : [
    ...photos.filter((photo) => !managedTitles.has(photo.title.toLowerCase())),
    ...managedGalleryPhotos,
  ]
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef(null)

  // Scroll strictly horizontally to explicit index
  const scrollToIndex = useCallback((index) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const card = container.children[index]
      if (card) {
        const targetScrollLeft = card.offsetLeft - container.offsetLeft
        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [])

  // Auto-scroll logic (every 3 seconds)
  useEffect(() => {
    if (isPaused || selectedIndex !== null) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % galleryPhotos.length
        scrollToIndex(nextIndex)
        return nextIndex
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, selectedIndex, scrollToIndex, galleryPhotos.length])

  // Handle manual scroll sync with pagination display
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollPosition = container.scrollLeft
      const cardWidth = container.firstElementChild?.offsetWidth || 300
      const newIndex = Math.round(scrollPosition / (cardWidth + 24)) // 24px gap
      setActiveIndex(Math.min(Math.max(newIndex, 0), galleryPhotos.length - 1))
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

  // Keyboard navigation for preview modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1))
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, galleryPhotos.length])

  return (
    <section
      id="gallery"
      className={`px-6 py-24 transition-colors duration-300 ${
        isDark ? "bg-[#050b18] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`mb-3 text-sm font-semibold tracking-wide uppercase ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            OUR MEMORIES
          </p>

          <h2
            className={`text-4xl font-bold tracking-tight sm:text-5xl transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Forum{" "}
            <span className={isDark ? "text-cyan-400" : "text-blue-600"}>
              Gallery
            </span>
          </h2>

          <p
            className={`mt-6 text-lg leading-8 transition-colors ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Explore moments, activities, and memories from the ETC Department Forum.
          </p>
        </div>

        {/* Gallery Container with Side Controls */}
        <div
          className="group relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Viewport Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryPhotos.map((photo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group/card relative h-80 min-w-[280px] max-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl snap-start focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                  isDark
                    ? "bg-slate-900/90 border-slate-800"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                <img
                  src={photo.image}
                  alt={photo.title.trim() || "Gallery photo"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                />

                {/* Card Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 pt-16">
                  {photo.category.trim() && photo.category !== "." && (
                    <p className="text-xs font-semibold tracking-wide text-cyan-300">
                      {photo.category}
                    </p>
                  )}

                  {photo.title.trim() && (
                    <h3 className="mt-1 text-lg font-bold text-white">
                      {photo.title}
                    </h3>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Left Overlay Control Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={`absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full shadow-lg border backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 sm:-left-5 ${
              isDark
                ? "bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800"
                : "bg-white/90 border-slate-100 text-slate-800 hover:bg-white"
            }`}
            aria-label="Scroll left"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Overlay Control Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className={`absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full shadow-lg border backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 sm:-right-5 ${
              isDark
                ? "bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800"
                : "bg-white/90 border-slate-100 text-slate-800 hover:bg-white"
            }`}
            aria-label="Scroll right"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Clean Numeric Pagination Indicator */}
        <div
          className={`mt-8 flex items-center justify-center gap-3 text-sm font-medium transition-colors ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          <span
            className={`tabular-nums font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {activeIndex + 1}
          </span>
          <span className={isDark ? "text-slate-600" : "text-slate-300"}>/</span>
          <span className="tabular-nums text-slate-500">{galleryPhotos.length}</span>
        </div>
      </div>

      {/* Full-screen Image Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Modal Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1))
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-8"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div
            className="relative max-h-[90vh] max-w-5xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryPhotos[selectedIndex].image}
              alt={galleryPhotos[selectedIndex].alt || galleryPhotos[selectedIndex].title}
              className="mx-auto max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">
                {galleryPhotos[selectedIndex].title || "Gallery Feature"}
              </h3>

              {galleryPhotos[selectedIndex].category.trim() && (
                <p className="mt-1 text-sm text-slate-300">
                  {galleryPhotos[selectedIndex].category}
                </p>
              )}
            </div>

            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-900 shadow-lg transition hover:bg-red-500 hover:text-white"
              aria-label="Close image preview"
            >
              ×
            </button>
          </div>

          {/* Modal Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0))
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-8"
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