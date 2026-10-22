import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "In-Charge", to: "/committee-incharge" },
  { name: "Activities", to: "/activities" },
  { name: "Events", to: "/events" },
  { name: "Gallery", to: "/gallery" },
  { name: "Achievements", to: "/achievements" },
  { name: "Team", to: "/team" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const firstMobileLinkRef = useRef(null);
  const { isDark } = useTheme();

  const closeMenu = () => setMenuOpen(false);

  // Scroll detection for Auron's sleek condensed navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape and return focus to the toggle button (keyboard accessibility)
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstMobileLinkRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopLinkClass = ({ isActive }) =>
    `relative text-[0.78rem] tracking-[1.5px] uppercase font-semibold py-1.5 transition-all duration-300 ${isActive
      ? isDark
        ? "text-[#3b9cff] drop-shadow-[0_0_8px_rgba(59,156,255,0.5)] after:w-full after:shadow-[0_0_8px_#3b9cff]"
        : "text-[#0d47a1] font-bold after:w-full"
      : isDark
        ? "text-[#abc4e3] hover:text-white hover:drop-shadow-[0_0_6px_rgba(59,156,255,0.3)] after:w-0 hover:after:w-full"
        : "text-[#2c3e5a] hover:text-[#0d47a1] after:w-0 hover:after:w-full"
    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-[var(--gold-gradient)] after:transition-all after:duration-300`;

  const mobileLinkClass = ({ isActive }) =>
    `border-b py-3 text-sm font-semibold tracking-wide uppercase transition-colors ${isDark ? "border-[#3b9cff1a]" : "border-[#0d47a114]"
    } ${isActive
      ? isDark
        ? "text-[#3b9cff] font-bold"
        : "text-[#0d47a1] font-bold"
      : isDark
        ? "text-[#abc4e3] hover:text-[#3b9cff]"
        : "text-[#2c3e5a] hover:text-[#0d47a1]"
    }`;

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full backdrop-blur-xl border-b transition-all duration-300 ${isScrolled ? "h-16 shadow-lg shadow-black/20" : "h-18"
        } ${isDark
          ? "border-[#3b9cff1a] bg-[#020b18cc]"
          : "border-[#0d47a114] bg-[#ffffffd9] shadow-sm"
        }`}
      aria-label="Primary"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* FEETA Logo & Auron-Style Title */}
        <Link
          to="/admin/login"
          className="flex min-w-0 items-center gap-3 group"
          onClick={closeMenu}
          aria-label="Open ETC administration login"
          title="Admin login"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] p-1 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105 shadow-sm">
            <img
              src="/etc-logo.png"
              alt="ETC Department logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="hidden min-w-0 sm:block">
            <h1
              className={`font-heading text-lg font-extrabold tracking-[2px] leading-tight transition-colors ${isDark ? "text-white" : "text-[#06152d]"
                }`}
            >
              FEETA <span className="text-gold-gradient text-xs uppercase font-body font-semibold tracking-widest ml-1">x ISF</span>
            </h1>

            <p
              className={`truncate text-[9.5px] uppercase tracking-[2px] font-medium transition-colors ${isDark ? "text-[#6481a5]" : "text-[#6b7c97]"
                }`}
            >
              Dept. of Electronics & Telecommunication
            </p>
          </div>
        </Link>

        {/* Desktop Navigation & Theme Toggle */}
        <div className="hidden items-center gap-7 lg:flex">
          <div className="flex items-center gap-6">
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

          {/* Theme Toggle Button */}
          <div className={`pl-3 border-l ${isDark ? "border-[#3b9cff26]" : "border-[#0d47a11f]"}`}>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Right Controls: Compact Theme Toggle & Hamburger */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle variant="circle" />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${isDark
                ? "border-[#3b9cff26] bg-[#ffffff08] text-[#abc4e3] hover:text-white hover:border-[#3b9cff66]"
                : "border-[#0d47a11f] bg-[#0d47a10a] text-[#2c3e5a] hover:text-[#0d47a1]"
              }`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            {menuOpen ? (
              <span className="text-lg font-bold leading-none">✕</span>
            ) : (
              <span className="text-xl leading-none">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className={`border-b px-6 py-5 lg:hidden backdrop-blur-2xl transition-all duration-300 ${isDark
              ? "border-[#3b9cff26] bg-[#051329f2] shadow-2xl"
              : "border-[#0d47a11f] bg-[#fffffffa] shadow-xl"
            }`}
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

            <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className={`text-xs uppercase tracking-wider font-semibold ${isDark ? "text-[#6481a5]" : "text-[#6b7c97]"}`}>
                Theme Style:
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;