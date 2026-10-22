import React from "react";
import { useTheme } from "../context/ThemeContext";

function CommitteeIncharge() {
  const { isDark } = useTheme();

  const inchargeData = {
    heading: "From Forum Incharge Desk",
    message:
      "At FEETA & ISF Committee, learning goes far beyond the classroom. Student technical forums play a vital role in nurturing creativity, leadership, teamwork, and technical excellence among students. They provide a dynamic platform where students can explore their interests, develop new skills in embedded systems and electronics, and engage meaningfully with the campus community.",
    name: "Prof. Ayushi Jaiswal",
    position: "Forum In-Charge",
    photo: "/members/incharge.jpg",
    linkedin: "https://www.linkedin.com/in/ayushi-jaiswal-22293737/",
    email: "ayushijaiswal@sbjit.edu.in",
  };

  return (
    <section
      id="incharge"
      className="py-24 px-4 sm:px-6 transition-colors duration-300 relative bg-[var(--bg-page)] text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Auron Glass Card Container */}
        <div
          className="glass-card relative overflow-hidden p-8 sm:p-12 transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-14">
            {/* Left Section: Image + Name + Position */}
            <div className="flex flex-col items-center shrink-0 w-full md:w-72">
              <div className="w-56 h-72 sm:w-64 sm:h-80 overflow-hidden shadow-2xl rounded-3xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={inchargeData.photo}
                  alt={inchargeData.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Name and Designation below the photo */}
              <div className="mt-5 text-center flex flex-col items-center">
                <span className="role-badge mb-2">
                  {inchargeData.position}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text-heading)] tracking-wide">
                  {inchargeData.name}
                </h3>
              </div>
            </div>

            {/* Right Section: Heading + Desk Message + Social Icons */}
            <div className="flex flex-col justify-start text-left pt-2 md:pt-4 flex-1">
              <span className="section-subtitle !text-left !mb-2">Leadership Message</span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-[var(--text-heading)] tracking-wide">
                {inchargeData.heading}
              </h2>

              <p
                className={`mt-6 text-sm sm:text-base md:text-lg leading-relaxed transition-colors ${
                  isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
                }`}
              >
                {inchargeData.message}
              </p>

              {/* Social Icons */}
              <div className="mt-8 flex items-center gap-4">
                {/* LinkedIn Link */}
                {inchargeData.linkedin && (
                  <a
                    href={inchargeData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
                      isDark
                        ? "bg-[#ffffff08] border-[#3b9cff33] text-[#3b9cff] hover:bg-[#3b9cff] hover:text-white hover:shadow-[0_0_15px_rgba(59,156,255,0.4)]"
                        : "bg-[#0d47a10a] border-[#0d47a126] text-[#0d47a1] hover:bg-[#0d47a1] hover:text-white hover:shadow-md"
                    }`}
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                    </svg>
                  </a>
                )}

                {/* Email Link */}
                {inchargeData.email && (
                  <a
                    href={`mailto:${inchargeData.email}`}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
                      isDark
                        ? "bg-[#ffffff08] border-[#3b9cff33] text-[#3b9cff] hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                        : "bg-[#0d47a10a] border-[#0d47a126] text-[#0d47a1] hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md"
                    }`}
                    aria-label="Send Email"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommitteeIncharge;