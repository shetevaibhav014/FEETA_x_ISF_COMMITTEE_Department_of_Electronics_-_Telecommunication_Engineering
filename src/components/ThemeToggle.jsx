import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({
  className = "",
  showLabel = true,
  variant = "pill", // 'pill' or 'circle'
}) {
  const { toggleTheme, isDark } = useTheme();

  if (variant === "circle" || !showLabel) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Current theme is ${isDark ? "Dark" : "Bright"}. Click to switch to ${isDark ? "Bright" : "Dark"
          } theme.`}
        title={`Switch to ${isDark ? "Bright" : "Dark"} mode`}
        onClick={toggleTheme}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark
            ? "bg-[#ffffff08] border border-[#ffffff18] text-[#abc4e3] hover:text-[#3b9cff] hover:border-[#3b9cff66] hover:shadow-[0_0_15px_rgba(59,156,255,0.35)] hover:-translate-y-0.5"
            : "bg-[#0d47a10a] border border-[#0d47a11f] text-[#2c3e5a] hover:text-[#0d47a1] hover:border-[#0d47a166] hover:shadow-[0_0_15px_rgba(13,71,161,0.25)] hover:-translate-y-0.5"
          } ${className}`}
      >
        <span className="relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
          {isDark ? (
            // Moon icon (Auron dark mode)
            <svg
              className="h-4 w-4 fill-current text-[#3b9cff] transition-transform duration-300"
              viewBox="0 0 24 24"
            >
              <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          ) : (
            // Sun icon (Auron bright mode)
            <svg
              className="h-4 w-4 text-[#0d47a1] transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Current theme is ${isDark ? "Dark" : "Bright"}. Click to switch to ${isDark ? "Bright" : "Dark"
        } theme.`}
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark
          ? "bg-[#051329]/90 text-[#f0f6fc] border border-[#3b9cff26] shadow-[0_0_15px_rgba(59,156,255,0.18)] hover:border-[#3b9cff66] hover:shadow-[0_0_20px_rgba(59,156,255,0.35)] hover:-translate-y-0.5"
          : "bg-white/95 text-[#0a1628] border border-[#0d47a126] shadow-sm hover:border-[#0d47a166] hover:shadow-[0_0_18px_rgba(13,71,161,0.2)] hover:-translate-y-0.5"
        } ${className}`}
    >
      {/* Icon Capsule */}
      <span
        className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${isDark
            ? "bg-gradient-to-tr from-[#1a6fd4] to-[#3b9cff] text-white shadow-[0_0_10px_#3b9cff]"
            : "bg-gradient-to-tr from-[#0d47a1] to-[#1e88e5] text-white shadow-[0_0_10px_#0d47a1]"
          }`}
      >
        {isDark ? (
          // Moon icon
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        ) : (
          // Sun icon
          <svg
            className="h-3.5 w-3.5 transition-transform duration-500 rotate-0 group-hover:rotate-45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </span>


    </button>
  );
}
