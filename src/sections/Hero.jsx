import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import EtcBackground from "./EtcBackground" // Ensure path matches your file location

export default function Hero() {
  const fullText = "A platform for students to learn, innovate, collaborate and lead through technology and teamwork."
  const [displayedText, setDisplayedText] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 40) // Speed of typing in ms

    return () => clearInterval(typingInterval)
  }, [])

  // Auto-trigger the Installation Ceremony popup after 1.5 seconds
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true)
    }, 1500)

    return () => clearTimeout(popupTimer)
  }, [])

  const handleSelectPopup = () => {
    setShowPopup(false);
    navigate("/installation-ceremony"); // Match the exact route in App.jsx
  };

  const handleCancelPopup = () => {
    setShowPopup(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* 3D Background confined strictly to Hero area */}
      <EtcBackground />

      {/* Floating logo animation keyframes & blinking cursor style */}
      <style>{`
        @keyframes heroLogoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes heroLogoGlowBlue {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.25)); }
          50% { filter: drop-shadow(0 0 26px rgba(56, 189, 248, 0.65)); }
        }
        @keyframes heroLogoGlowCyan {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.25)); }
          50% { filter: drop-shadow(0 0 26px rgba(34, 211, 238, 0.65)); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-logo-feeta {
          animation: heroLogoFloat 5s ease-in-out infinite, heroLogoGlowBlue 5s ease-in-out infinite;
        }
        .hero-logo-isf {
          animation: heroLogoFloat 5s ease-in-out infinite 1.2s, heroLogoGlowCyan 5s ease-in-out infinite 1.2s;
        }
        .typewriter-cursor {
          animation: blink 0.8s infinite;
        }
      `}</style>

      {/* FEETA Logo - Left Side */}
      <img
        src="/feeta.png"
        alt="FEETA - Future Electronics Engineering Technocrats Association Logo"
        className="hero-logo-feeta absolute left-2 top-1/2 z-10 hidden h-28 w-28 -translate-y-1/2 object-contain md:left-4 md:block md:h-36 md:w-36 lg:left-8 lg:h-52 lg:w-52 xl:left-12 xl:h-64 xl:w-64 2xl:left-20 2xl:h-72 2xl:w-72"
      />

      {/* IETE Logo - Right Side */}
      <img
        src="/ISF.png"
        alt="IETE - The Institution of Electronics and Telecommunication Engineers Logo"
        className="hero-logo-isf absolute right-2 top-1/2 z-10 hidden h-28 w-28 -translate-y-1/2 object-contain md:right-4 md:block md:h-36 md:w-36 lg:right-8 lg:h-52 lg:w-52 xl:right-12 xl:h-64 xl:w-64 2xl:right-20 2xl:h-72 2xl:w-72"
      />

      {/* Hero Overlay Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        
        {/* Top Department Badge */}
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Department of <><br/></>Electronics & Telecommunication Engineering
        </p>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6">
          FEETA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> x </span> ISF
        </h1>

        {/* Subtitle with Typewriter Effect */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 uppercase tracking-wide min-h-[4rem] sm:min-h-[3rem]">
          {displayedText}
          <span className="typewriter-cursor text-cyan-400 font-bold ml-0.5">|</span>
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          
          {/* Primary Action Button */}
          <Link
            to="/community"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.currentTarget.blur()}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:from-blue-500 hover:to-cyan-500 hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Community
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1"></span>
          </Link>

          {/* Secondary Action Button */}
          <Link
            to="/team"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:from-blue-500 hover:to-cyan-500 hover:-translate-y-0.5 active:translate-y-0"
          >
            Meet the Team
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1"></span>
          </Link>
        </div>

        {/* Secondary Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* FEETA Badge */}
          <Link
            to="/feeta"
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-md border border-blue-600/30 bg-blue-950/40 backdrop-blur-md text-sm text-slate-300 shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all duration-300 hover:border-blue-500/60 hover:bg-blue-950/60 hover:-translate-y-0.5"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse"></span>
            <span className="font-semibold text-white">FEETA</span>
            <span className="text-slate-500">-</span>
            <span className="text-blue-400 font-medium">STUDENT FORUM</span>
          </Link>

          {/* ISF Badge */}
          <Link
            to="/isf"
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-md border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-sm text-slate-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-950/60 hover:-translate-y-0.5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse"></span>
            <span className="font-semibold text-white">ISF</span>
            <span className="text-slate-500">-</span>
            <span className="text-cyan-400 font-medium">TECHNICAL COMMITEE</span>
          </Link>
        </div>

      </div>

      {/* Installation Ceremony Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100 text-slate-900">
            
            {/* Close Cross Button */}
            <button
              onClick={handleCancelPopup}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* FEETA & ISF Logos Side-by-Side */}
            <div className="mx-auto flex items-center justify-center gap-3 py-2">
              <img
                src="/feeta.png"
                alt="FEETA Logo"
                className="h-10 w-10 object-contain drop-shadow"
              />
              <span className="text-slate-400 font-light text-lg">×</span>
              <img
                src="/ISF.png"
                alt="ISF Logo"
                className="h-10 w-10 object-contain drop-shadow"
              />
            </div>

            {/* Popup Content */}
            <div className="mt-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Featured Event
              </span>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                Installation Ceremony
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Take a look at the official highlights, photos, and memorable moments from our ETC Department Installation Ceremony!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCancelPopup}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSelectPopup}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md transition-all active:scale-95"
              >
                View Photos
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}