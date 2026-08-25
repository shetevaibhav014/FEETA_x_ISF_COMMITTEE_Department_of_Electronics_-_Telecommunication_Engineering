import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InstallationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after a 1.5 second delay on page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = () => {
    setIsOpen(false);
    // Redirects to Gallery (or a specific route like /gallery?event=installation)
    navigate("/gallery");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          🎉
        </div>

        {/* Content */}
        <div className="mt-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Special Highlight
          </span>
          <h3 className="mt-1 text-xl font-bold text-slate-900">
            Installation Ceremony
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Explore the highlights and memorable moments from our official ETC Forum Installation Ceremony.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSelect}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            View Photos
          </button>
        </div>

      </div>
    </div>
  );
}

export default InstallationPopup;