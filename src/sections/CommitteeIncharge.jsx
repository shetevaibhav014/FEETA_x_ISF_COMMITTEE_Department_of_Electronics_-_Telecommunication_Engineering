import React from "react";

function CommitteeIncharge() {
  const inchargeData = {
    heading: "From Forum Incharge Desk",
    message:
      "At FEETA & ISF Committee, learning goes far beyond the classroom. Student technical forums play a vital role in nurturing creativity, leadership, teamwork, and technical excellence among students. They provide a dynamic platform where students can explore their interests, develop new skills in embedded systems and electronics, and engage meaningfully with the campus community.",
    name: "Prof. Ayushi Jaiswal",
    position: "Forum In-Charge",
    photo: "/members/incharge.jpg",
    linkedin: "https://www.linkedin.com/in/ayushi-jaiswal", // Update with exact LinkedIn URL
    email: "ayushijaiswal@sbjit.edu.in", // Update with exact email address
  };

  return (
    <section id="incharge" className="bg-slate-900 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Main Blue Banner Container */}
        <div className="relative overflow-hidden rounded-xl bg-[#1e295b] p-6 sm:p-10 shadow-xl border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            
            {/* Left Section: Image + Name + Position + Socials */}
            <div className="flex flex-col items-center shrink-0 w-full md:w-72">
              {/* Image Container with custom top-right rounded corner */}
              <div className="w-56 h-72 sm:w-64 sm:h-80 overflow-hidden bg-white shadow-lg rounded-tl-3xl rounded-br-3xl rounded-tr-[4rem] border-2 border-white/20">
                <img
                  src={inchargeData.photo}
                  alt={inchargeData.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Name and Designation below the photo */}
              <div className="mt-4 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {inchargeData.name}
                </h3>
                <p className="mt-1 text-sm sm:text-base font-semibold text-slate-200">
                  {inchargeData.position}
                </p>

                {/* Social Links (LinkedIn & Gmail) */}
                <div className="mt-3 flex items-center justify-center gap-3">
                  {/* LinkedIn Link */}
                  {inchargeData.linkedin && (
                    <a
                      href={inchargeData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-[#0A66C2] hover:scale-110"
                      aria-label="LinkedIn Profile"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                      </svg>
                    </a>
                  )}

                  {/* Gmail Link */}
                  {inchargeData.email && (
                    <a
                      href={`mailto:${inchargeData.email}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-red-500 hover:scale-110"
                      aria-label="Send Email"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section: Heading + Desk Message */}
            <div className="flex flex-col justify-start text-left text-white pt-2 md:pt-4 flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold tracking-wide text-white">
                {inchargeData.heading}
              </h2>

              <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-slate-200 font-normal">
                {inchargeData.message}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CommitteeIncharge;