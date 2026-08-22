import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-10 sm:px-6 sm:py-12 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* 1. Brand, Department & Direct Contact Info */}
          <div className="flex flex-col space-y-3 sm:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                FEETA <span className="text-blue-500">&</span> ISF COMMITTEE
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Department of Electronics & Telecommunication Engineering
              </p>
            </div>

            {/* Email Contact */}
            <a
              href="mailto:etcforum@sbjit.edu.in"
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white mt-1 w-fit"
            >
              <svg className="h-4 w-4 shrink-0 text-blue-500 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="break-all sm:break-normal">etcforum@sbjit.edu.in</span>
            </a>

            {/* Mobile Contact */}
            {/* Mobile Contact */}
            <a
              href="tel:+919405905318"
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white w-fit"
            >
              <svg className="h-4 w-4 shrink-0 text-blue-500 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 94059 05318</span>
            </a>
          </div>

          {/* 2. Quick Navigation Links */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="flex flex-col items-start">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                Quick Links
              </h4>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm text-slate-400">
                <Link to="/" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 hover:text-white">
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover:scale-125">››</span> Home
                </Link>
                <Link to="/about" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 hover:text-white">
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover:scale-125">››</span> About
                </Link>
                <Link to="/contact" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 hover:text-white">
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover:scale-125">››</span> Contact
                </Link>
              </div>
            </div>
          </div>

          {/* 3. GET IN TOUCH */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white mb-1">
              GET IN TOUCH
            </h4>
            
            {/* Location */}
            <a
              href="https://maps.google.com/?q=S.B.+Jain+Institute+of+Technology,+Management+and+Research,+Nagpur"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white leading-normal"
            >
              <svg className="h-5 w-5 shrink-0 text-blue-500 mt-0.5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>S.B. Jain Institute of Technology, Management and Research, Nagpur</span>
            </a>

            {/* Working Hours */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 w-fit">
              <svg className="h-4 w-4 shrink-0 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white w-fit"
            >
              <svg className="h-4 w-4 shrink-0 text-blue-500 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/officialfeeta?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white w-fit"
            >
              <svg className="h-4 w-4 shrink-0 text-pink-500 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>OFFICIAL FEETA</span>
            </a>
          </div>

        </div>

        {/* Responsive Divider */}
        <div className="my-6 sm:my-8 border-t border-slate-800" />

        {/* Responsive Copyright */}
        <div className="text-center text-xs sm:text-sm text-slate-500 space-y-1">
          <p>
            © {new Date().getFullYear()} FEETA & ISF COMMITTEE. All rights reserved.
          </p>
          <p>
            Designed & Developed by the ETC Forum Technical Team.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;