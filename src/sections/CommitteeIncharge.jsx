import React from "react";

function CommitteeIncharge() {
  const inchargeData = {
    heading: "From Forum Incharge Desk",
    message:
      "At FEETA & ISF Committee, learning goes far beyond the classroom. Student technical forums play a vital role in nurturing creativity, leadership, teamwork, and technical excellence among students. They provide a dynamic platform where students can explore their interests, develop new skills in embedded systems and electronics, and engage meaningfully with the campus community.",
    name: "Prof. Ayushi Jaiswal",
    position: "Forum In-Charge",
    // Make sure your photo is saved inside your project's public folder (e.g., public/incharge.jpg)
    photo: "/incharge.jpg",
  };

  return (
    <section id="incharge" className="bg-slate-900 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Main Blue Banner Container */}
        <div className="relative overflow-hidden rounded-xl bg-[#1e295b] p-6 sm:p-10 shadow-xl border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            
            {/* Left Section: Image + Name + Position */}
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