import React from "react";
import { useTheme } from "../context/ThemeContext";

function MemberCard({ member }) {
  const { isDark } = useTheme();

  return (
    <div
      className="glass-card group overflow-hidden flex flex-col items-center h-[460px] w-full shrink-0 transition-all duration-300"
    >
      {/* Member Photo */}
      <div
        className={`aspect-square w-full overflow-hidden relative ${
          isDark ? "bg-[#051329]" : "bg-[#f5f8fc]"
        }`}
      >
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-40" />
      </div>

      {/* Member Information */}
      <div className="p-6 text-center flex flex-1 flex-col justify-between items-center w-full">
        {/* Top Info */}
        <div className="w-full flex flex-col items-center">
          {/* Auron Role Badge */}
          <span className="role-badge mb-2.5">
            {member.role}
          </span>

          <h3
            className="text-lg sm:text-xl font-bold font-heading transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)] tracking-wide line-clamp-1"
          >
            {member.name}
          </h3>
        </div>

        {/* Bottom Info */}
        <div className="w-full flex flex-col items-center">
          <p
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isDark ? "text-[#6481a5]" : "text-[#6b7c97]"
            }`}
          >
            {member.year}
          </p>

          {/* Clickable LinkedIn ID Badge */}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-semibold shadow-sm hover:scale-105 ${
                isDark
                  ? "bg-[#020b18] border-[#3b9cff33] text-[#abc4e3] hover:text-white hover:border-[#3b9cff88] hover:shadow-[0_0_12px_rgba(59,156,255,0.3)]"
                  : "bg-white border-[#0d47a126] text-[#2c3e5a] hover:text-[#0d47a1] hover:border-[#0d47a166]"
              }`}
              aria-label={`Visit ${member.name}'s LinkedIn profile`}
            >
              <svg
                className="h-3.5 w-3.5 fill-current text-[var(--color-gold)]"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.7-2.1 1.75-2.1 1.05 0 1.5.8 1.5 2.1v4.93h2.79M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
              </svg>
              <span>{member.linkedinId}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberCard;