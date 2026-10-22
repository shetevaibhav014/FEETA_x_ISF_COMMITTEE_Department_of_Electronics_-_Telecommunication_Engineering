import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import usePublicContent from "../hooks/usePublicContent";

function Footer() {
  const { isDark } = useTheme();
  const { items: footerEntries } = usePublicContent("footer");
  const footer = footerEntries[0]?.data || {};
  const email = footer.email || "etcforum@sbjit.edu.in";
  const phone = footer.phone || "+91 94059 05318";
  const footerLinks = Array.isArray(footer.links) ? footer.links : [];

  return (
    <footer
      className={`px-4 py-12 sm:px-6 sm:py-16 transition-colors duration-300 border-t relative ${
        isDark
          ? "bg-[#020b18] text-[#f0f6fc] border-[#3b9cff1a]"
          : "bg-[#f5f8fc] text-[#0a1628] border-[#0d47a114]"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Auron Decorative Separator Ornament */}
        <div className="footer-separator-container !my-0 !mb-12">
          <div className="footer-separator-line" />
          <div className="footer-separator-ornament">✦</div>
          <div className="footer-separator-line" />
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1. Brand, Department & Direct Contact Info */}
          <div className="flex flex-col space-y-4 sm:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading tracking-[2px] text-[var(--text-heading)]">
                FEETA <span className="text-gold-gradient font-body text-base tracking-widest font-bold">x</span> ISF
              </h3>
              <p
                className={`mt-2 text-xs sm:text-sm uppercase tracking-wider font-semibold leading-relaxed ${
                  isDark ? "text-[#6481a5]" : "text-[#6b7c97]"
                }`}
              >
                Department of Electronics & Telecommunication Engineering
              </p>
            </div>

            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
              }`}
            >
              Empowering student engineering minds through technical hackathons,
              competitions, innovative hardware sprints, and leadership.
            </p>

            {/* Direct Contacts */}
            <div className="flex flex-col space-y-2 pt-2">
              <a
                href={`mailto:${email}`}
                className={`group inline-flex items-center gap-2.5 text-xs sm:text-sm transition-all duration-200 hover:translate-x-1 ${
                  isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                }`}
              >
                <svg
                  className="h-4 w-4 shrink-0 text-[var(--color-gold)] transition-transform duration-200 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="break-all sm:break-normal">{email}</span>
              </a>

              <a
                href={`tel:${phone.replaceAll(" ", "")}`}
                className={`group inline-flex items-center gap-2.5 text-xs sm:text-sm transition-all duration-200 hover:translate-x-1 ${
                  isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                }`}
              >
                <svg
                  className="h-4 w-4 shrink-0 text-[var(--color-gold)] transition-transform duration-200 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{phone}</span>
              </a>
            </div>
          </div>

          {/* 2. Quick Navigation Links */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="flex flex-col items-start">
              <h4 className="text-sm font-bold uppercase tracking-[2px] font-heading text-[var(--text-heading)] mb-4">
                Quick Links
              </h4>
              <div className="flex flex-col space-y-2.5 text-xs sm:text-sm">
                <Link
                  to="/"
                  className={`group inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 ${
                    isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                  }`}
                >
                  <span className="text-[var(--color-gold)] font-bold">›</span> Home
                </Link>
                <Link
                  to="/about"
                  className={`group inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 ${
                    isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                  }`}
                >
                  <span className="text-[var(--color-gold)] font-bold">›</span> About
                </Link>
                <Link
                  to="/activities"
                  className={`group inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 ${
                    isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                  }`}
                >
                  <span className="text-[var(--color-gold)] font-bold">›</span> Activities
                </Link>
                <Link
                  to="/events"
                  className={`group inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 ${
                    isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                  }`}
                >
                  <span className="text-[var(--color-gold)] font-bold">›</span> Events
                </Link>
                <Link
                  to="/team"
                  className={`group inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 ${
                    isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                  }`}
                >
                  <span className="text-[var(--color-gold)] font-bold">›</span> Committee Team
                </Link>
                <Link
                  to="/contact"
                  className={`group inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 ${
                    isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
                  }`}
                >
                  <span className="text-[var(--color-gold)] font-bold">›</span> Contact
                </Link>
              </div>
            </div>
          </div>

          {/* 3. GET IN TOUCH */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-[2px] font-heading text-[var(--text-heading)] mb-1">
              Get In Touch
            </h4>

            {/* Location */}
            <a
              href="https://maps.google.com/?q=S.B.+Jain+Institute+of+Technology,+Management+and+Research,+Nagpur"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed transition-all duration-200 hover:translate-x-1 ${
                isDark ? "text-[#abc4e3] hover:text-white" : "text-[#4a5568] hover:text-[#0d47a1]"
              }`}
            >
              <svg
                className="h-5 w-5 shrink-0 text-[var(--color-gold)] mt-0.5 transition-transform duration-200 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>S.B. Jain Institute of Technology, Management and Research, Nagpur</span>
            </a>

            {/* Working Hours */}
            <div
              className={`inline-flex items-center gap-2.5 text-xs sm:text-sm ${
                isDark ? "text-[#6481a5]" : "text-[#6b7c97]"
              }`}
            >
              <svg className="h-4 w-4 shrink-0 text-[var(--color-gold)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={footer.linkedin || "https://www.linkedin.com/company/feeta-forum/about/"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-[#ffffff08] border-[#3b9cff33] text-[#3b9cff] hover:bg-[#3b9cff] hover:text-white"
                    : "bg-white border-[#0d47a126] text-[#0d47a1] hover:bg-[#0d47a1] hover:text-white"
                }`}
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href={footer.instagram || "https://www.instagram.com/officialfeeta"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-[#ffffff08] border-[#3b9cff33] text-[#3b9cff] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white"
                    : "bg-white border-[#0d47a126] text-[#0d47a1] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white"
                }`}
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Responsive Divider */}
        <div className="my-8 border-t border-[var(--border-color)] opacity-60" />

        {/* Copyright */}
        {footerLinks.length > 0 && (
          <nav className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--text-secondary)]" aria-label="Additional footer links">
            {footerLinks.map((item) => <a key={`${item.label}-${item.url}`} href={item.url} target={item.url?.startsWith("http") ? "_blank" : undefined} rel={item.url?.startsWith("http") ? "noreferrer" : undefined}>{item.label}</a>)}
          </nav>
        )}

        <div
          className={`flex flex-col sm:flex-row items-center justify-between text-xs transition-colors gap-2 ${
            isDark ? "text-[#6481a5]" : "text-[#6b7c97]"
          }`}
        >
          <p>© {new Date().getFullYear()} FEETA & ISF COMMITTEE. All rights reserved.</p>
          <p>SBJITMR Department of Electronics & Telecommunication Engineering</p>
        </div>
        <nav className="mt-4 flex justify-center gap-5 text-xs text-[var(--text-muted)]" aria-label="Legal">
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/announcements">Announcements</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;