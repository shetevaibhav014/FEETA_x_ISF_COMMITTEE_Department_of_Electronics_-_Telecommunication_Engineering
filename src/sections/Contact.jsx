import React from "react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { api } from "../lib/api";
import { useToast } from "../context/useToast";

function Contact() {
  const { isDark } = useTheme();
  const { notify } = useToast();
  const [message, setMessage] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const leadership = [
    {
      role: "Committee Incharge",
      name: "Prof. Ayushi Jaiswal",
      email: "ayushijaiswal@sbjit.edu.in",
      linkedin: "https://www.linkedin.com/in/ayushi-jaiswal-22293737/",
      image: "/members/incharge.jpg",
    },
    {
      role: "President",
      name: "Mr. Tushar Thakare",
      email: "tusharthakare.etc24@sbjit.edu.in",
      linkedin: "https://www.linkedin.com/in/tushar-thakare-a44445342/",
      image: "/members/a.jpg",
    },
    {
      role: "Vice President",
      name: "Ms. Divyani Daware",
      email: "divyanidaware.etc24@sbjit.edu.in",
      linkedin: "https://www.linkedin.com/in/divyani-daware-047716416/",
      image: "/members/b.jpg",
    },
  ];

  const submitMessage = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      await api("/forms", { method: "POST", body: JSON.stringify(message) });
      setMessage({ name: "", email: "", message: "" });
      notify("Your message has been sent.");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className={`px-6 py-24 transition-colors duration-300 ${
        isDark ? "bg-[#030712] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-[0.3em] transition-colors ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            Get In Touch
          </p>
          <h2
            className={`text-4xl font-bold tracking-tight sm:text-5xl transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Connect With{" "}
            <span className={isDark ? "text-cyan-400" : "text-blue-600"}>
              Forum
            </span>
          </h2>
          <p
            className={`mt-6 text-lg leading-8 transition-colors ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Have a question, suggestion or want to participate in our activities?
            Get in touch with our team or leadership directly.
          </p>
        </div>

        {/* General Contact Info Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
          <a
            href="mailto:etcforum@sbjit.edu.in"
            className={`group rounded-2xl border p-8 text-center transition duration-300 hover:-translate-y-2 ${
              isDark
                ? "border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10"
                : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-white hover:shadow-xl"
            }`}
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition ${
                isDark
                  ? "bg-blue-950/60 border border-blue-500/30 group-hover:bg-cyan-600 group-hover:text-white"
                  : "bg-blue-50 group-hover:bg-blue-600 group-hover:text-white"
              }`}
            >
              📧
            </div>
            <h3
              className={`mt-5 text-xl font-bold transition-colors ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Email
            </h3>
            <p
              className={`mt-2 text-sm transition-colors ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              etcforum@sbjit.edu.in
            </p>
          </a>

          <a
            href="https://maps.app.goo.gl/WU3GtKYk3fxEXXKY6"
            target="_blank"
            rel="noopener noreferrer"
            className={`block rounded-2xl border p-8 text-center transition duration-300 hover:-translate-y-2 group ${
              isDark
                ? "border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10"
                : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-white hover:shadow-xl"
            }`}
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition ${
                isDark
                  ? "bg-blue-950/60 border border-blue-500/30 group-hover:bg-cyan-600 group-hover:text-white"
                  : "bg-blue-50 group-hover:bg-blue-600 group-hover:text-white"
              }`}
            >
              📍
            </div>

            <h3
              className={`mt-5 text-xl font-bold transition-colors ${
                isDark
                  ? "text-white group-hover:text-cyan-400"
                  : "text-slate-900 group-hover:text-blue-600"
              }`}
            >
              Location
            </h3>

            <p
              className={`mt-2 text-sm transition-colors ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Department of ETC, SBJITMR, Nagpur
            </p>

            <span
              className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold group-hover:underline ${
                isDark ? "text-cyan-400" : "text-blue-600"
              }`}
            >
              Open in Google Maps →
            </span>
          </a>

          <a
            href="https://linkedin.com/company/feeta-forum"
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-2xl border p-8 text-center transition duration-300 hover:-translate-y-2 ${
              isDark
                ? "border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10"
                : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-white hover:shadow-xl"
            }`}
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition ${
                isDark
                  ? "bg-blue-950/60 border border-blue-500/30 group-hover:bg-cyan-600 group-hover:text-white"
                  : "bg-blue-50 group-hover:bg-blue-600 group-hover:text-white"
              }`}
            >
              📱
            </div>
            <h3
              className={`mt-5 text-xl font-bold transition-colors ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Social Media
            </h3>
            <p
              className={`mt-2 text-sm transition-colors ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Follow our updates
            </p>
          </a>
        </div>

        <form onSubmit={submitMessage} className={`mx-auto mt-16 max-w-3xl rounded-2xl border p-6 sm:p-8 ${isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-slate-50"}`}>
          <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Send the committee a message</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold" htmlFor="contact-name">Name
              <input id="contact-name" autoComplete="name" required maxLength="100" value={message.name} onChange={(event) => setMessage({ ...message, name: event.target.value })} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-3 text-[var(--text-primary)]" />
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="contact-email">Email
              <input id="contact-email" type="email" autoComplete="email" required maxLength="254" value={message.email} onChange={(event) => setMessage({ ...message, email: event.target.value })} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-3 text-[var(--text-primary)]" />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2" htmlFor="contact-message">Message
              <textarea id="contact-message" required maxLength="5000" rows="5" value={message.message} onChange={(event) => setMessage({ ...message, message: event.target.value })} className="resize-y rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-3 text-[var(--text-primary)]" />
            </label>
          </div>
          <button type="submit" disabled={sending} className="cta-button mt-5">{sending ? "Sending…" : "Send message"} <span>→</span></button>
        </form>

        {/* Key Leadership Contact Section */}
        <div className="mt-20">
          <div className="text-center">
            <h3
              className={`text-2xl font-bold sm:text-3xl transition-colors ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Key Contacts
            </h3>
            <p
              className={`mt-2 transition-colors ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Reach out directly to the Committee Leadership
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
            {leadership.map((person, index) => (
              <div
                key={index}
                className={`flex flex-col items-center rounded-2xl border p-6 text-center transition duration-300 hover:-translate-y-2 ${
                  isDark
                    ? "border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10"
                    : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-white hover:shadow-xl"
                }`}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className={`h-28 w-28 rounded-full object-cover border-4 shadow-md ${
                    isDark ? "border-cyan-500/20" : "border-blue-100"
                  }`}
                />
                <span
                  className={`mt-4 rounded-full px-3 py-1 text-xs font-semibold ${
                    isDark
                      ? "bg-blue-950/80 text-cyan-400 border border-blue-800/60"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {person.role}
                </span>
                <h4
                  className={`mt-3 text-lg font-bold transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {person.name}
                </h4>

                {/* Social Links */}
                <div className="mt-5 flex gap-3">
                  <a
                    href={`mailto:${person.email}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                      isDark
                        ? "bg-slate-800 text-cyan-400 hover:bg-cyan-600 hover:text-white"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
                    title="Send Email"
                  >
                    📧
                  </a>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition font-bold text-xs ${
                      isDark
                        ? "bg-slate-800 text-cyan-400 hover:bg-cyan-600 hover:text-white"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
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