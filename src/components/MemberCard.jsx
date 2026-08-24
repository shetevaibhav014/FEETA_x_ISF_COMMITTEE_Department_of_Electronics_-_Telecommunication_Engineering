import React from "react";

function MemberCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center h-[460px] w-full shrink-0">

      {/* Member Photo (Unchanged) */}
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Member Information */}
      <div className="p-6 text-center flex flex-1 flex-col justify-between items-center w-full">

        {/* Top Info */}
        <div className="w-full">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {member.name}
          </h3>

          <p className="mt-1 font-medium text-blue-600">
            {member.role}
          </p>
        </div>

        {/* Bottom Info */}
        <div className="w-full flex flex-col items-center">
          <p className="mt-2 text-sm text-slate-500">
            {member.year}
          </p>

          {/* Clickable LinkedIn ID Badge (Unchanged) */}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs font-semibold shadow-sm hover:shadow-md hover:scale-105"
              aria-label={`Visit ${member.name}'s LinkedIn profile`}
            >
              <svg
                className="h-4 w-4 fill-current text-blue-600 group-hover:text-white transition-colors"
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