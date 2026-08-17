import { useEffect, useRef, useState } from "react"
import { NavLink, Link } from "react-router-dom"

// Route paths map 1:1 to the pages/sections you already have:
// Home -> Hero, About Us -> About, Committee In-Charge -> CommitteeIncharge,
// Activities -> Activities, Events -> Events, Gallery -> Gallery,
// Achievements -> Achievements, Team -> Team
const links = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "Committee In-Charge", to: "/committee-incharge" },
  { name: "Activities", to: "/activities" },
  { name: "Events", to: "/events" },
  { name: "Gallery", to: "/gallery" },
  { name: "Achievements", to: "/achievements" },
  { name: "Team", to: "/team" },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const firstMobileLinkRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  // Close on Escape and return focus to the toggle button (keyboard accessibility)
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    // Move focus into the open menu so keyboard users land somewhere sensible
    firstMobileLinkRef.current?.focus()

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  // Close the mobile menu automatically if the viewport grows into desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`

  const mobileLinkClass = ({ isActive }) =>
    `border-b border-slate-100 py-3 text-sm font-medium transition ${
      isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
    }`

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">

        {/* FEETA Logo */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          onClick={closeMenu}
          aria-label="FEETA Home"
        >
          <img
            src="/forumlogo.png"
            alt="FEETA Logo"
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
          />

          <div className="hidden min-w-0 sm:block">
            <h1 className="text-base font-bold leading-tight text-slate-900 md:text-lg">
              FEETA
            </h1>

            <p className="truncate text-[11px] text-slate-500 md:text-xs">
              Department of Electronics & Telecommunication Engineering
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.to === "/"}
              className={desktopLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col">
            {links.map((link, index) => (
              <NavLink
                key={link.name}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                to={link.to}
                end={link.to === "/"}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar