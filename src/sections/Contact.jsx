import React from "react";

function Contact() {
  const leadership = [
    {
      role: "Committee Incharge",
      name: "Prof. Ayushi Jaiswal",
      email: "ayushijaiswal@sbjit.edu.in",
      linkedin: "https://linkedin.com/in/username",
      image: "/members/incharge.jpg", // Replace with actual path in public folder
    },
    {
      role: "President",
      name: "Mr. Tushar Thakare",
      email: "tusharthakare.etc24@sbjit.edu.in",
      linkedin: "https://linkedin.com/in/username",
      image: "/members/a.png",
    },
    {
      role: "Vice President",
      name: "Ms. Divyani Daware",
      email: "divyanidaware.etc24@sbjit.edu.in",
      linkedin: "https://linkedin.com/in/username",
      image: "/members/b.jpg",
    },
  ];

  return (
    <section id="contact" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Main Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Get In Touch
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Connect With <span className="text-blue-600">ETC Forum</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have a question, suggestion or want to participate in our activities?
            Get in touch with our team or leadership directly.
          </p>
        </div>

        {/* General Contact Info Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
          <a
            href="mailto:etcforum@sbjit.edu.in"
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:bg-white hover:shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:bg-blue-600 group-hover:text-white">
              📧
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">Email</h3>
            <p className="mt-2 text-sm text-slate-600">etcforum@sbjit.edu.in</p>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:bg-white hover:shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              📍
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">Location</h3>
            <p className="mt-2 text-sm text-slate-600">
              Department of ETC, SBJITMR, Nagpur
            </p>
          </div>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:bg-white hover:shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:bg-blue-600 group-hover:text-white">
              📱
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Social Media
            </h3>
            <p className="mt-2 text-sm text-slate-600">Follow our updates</p>
          </a>
        </div>

        {/* Key Leadership Contact Section */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Key Contacts
            </h3>
            <p className="mt-2 text-slate-600">
              Reach out directly to the Committee Leadership
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
            {leadership.map((person, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:bg-white hover:shadow-xl"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-28 w-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                <span className="mt-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {person.role}
                </span>
                <h4 className="mt-3 text-lg font-bold text-slate-900">
                  {person.name}
                </h4>

                {/* Social Links */}
                <div className="mt-5 flex gap-3">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    title="Send Email"
                  >
                    📧
                  </a>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white font-bold"
                    title="LinkedIn Profile"
                  >
                    in
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;