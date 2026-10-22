import React, { useRef, useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import { useTheme } from "../context/ThemeContext";
import usePublicContent from "../hooks/usePublicContent";

/* eslint-disable react/only-export-components */
export const presidentData = {
  name: "Mr. Tushar Thakare",
  role: "President",
  department: "Department of Electronics & Telecommunication Engineering",
  year: "3rd Year",
  vision:
    "To build an inclusive ecosystem driving technical innovation, student leadership, and impactful collaboration across the ETC forum.",
  image: "/members/a.jpg",
  linkedinId: "in/tushar-thakare",
  linkedinUrl: "https://www.linkedin.com/in/tushar-thakare-a44445342/",
};

// Complete list of 21 FEETA Members
export const feetaMembers = [
  {
    name: "Ms. Divyani Daware",
    role: "Vice President - FEETA",
    year: "3rd Year",
    image: "/members/b.jpg",
    linkedinId: "in/divyani-daware",
    linkedinUrl: "https://www.linkedin.com/in/divyani-daware-047716416/",
  },
  {
    name: "Mr. Prathmesh Kharalkar",
    role: "Secretary",
    year: "3rd Year",
    image: "/members/prathmesh.png",
    linkedinId: "in/prathmesh-kharalkar",
    linkedinUrl: "https://www.linkedin.com/in/prathmesh-kharalkar-535525330/",
  },
  {
    name: "Ms. Tanvi Wankhede",
    role: "Joint Secretary",
    year: "2nd Year",
    image: "/members/tanvi.jpeg",
    linkedinId: "in/tanvi-wankhede",
    linkedinUrl: "https://www.linkedin.com/in/tanvi-wankhede-3b15613ab/",
  },
  {
    name: "Ms. Triveni Naik",
    role: "Treasurer",
    year: "3rd Year",
    image: "/members/triveni.png",
    linkedinId: "in/triveni-naik",
    linkedinUrl: "https://www.linkedin.com/in/triveni-naik-5909bb342/",
  },
  {
    name: "Mr. Pratham Banode",
    role: "Joint Treasurer",
    year: "2nd Year",
    image: "/members/pratham.png",
    linkedinId: "in/pratham-banode",
    linkedinUrl: "https://www.linkedin.com/in/pratham-banode-2011422a5/",
  },
  {
    name: "Mr. Vansh Gawande",
    role: "Event Manager",
    year: "3rd Year",
    image: "/members/vansh.png",
    linkedinId: "in/vansh-gawande",
    linkedinUrl: "https://www.linkedin.com/in/vansh-gawande-40076a430/",
  },
  {
    name: "Mr. Harsh Thombre",
    role: "Technical Head",
    year: "3rd Year",
    image: "/members/harsh.png",
    linkedinId: "in/harsh-thombre",
    linkedinUrl: "https://www.linkedin.com/in/harsh-thombre-94a796332/",
  },
  {
    name: "Ms. Vidisha Bhadang",
    role: "PRO / Invitation & Reception Head",
    year: "3rd Year",
    image: "/members/vidisha.jpg",
    linkedinId: "in/vidisha-bhadang",
    linkedinUrl: "https://linkedin.com/in/vidisha-bhadang",
  },
  {
    name: "Mr. Piyush Bawankar",
    role: "Sports Head",
    year: "3rd Year",
    image: "/members/piyush.jpeg",
    linkedinId: "in/piyush-bawankar",
    linkedinUrl: "https://www.linkedin.com/in/piyush-bawankar-820413337/",
  },
  {
    name: "Mr. Somesh Khangare",
    role: "Discipline Head",
    year: "3rd Year",
    image: "/members/somesh.png",
    linkedinId: "in/somesh-khangare",
    linkedinUrl: "https://www.linkedin.com/in/somesh-khangare-321443342/",
  },
  {
    name: "Mr. Sujal Jangilwar",
    role: "Media Head",
    year: "2nd Year",
    image: "/members/sujal.jpeg",
    linkedinId: "in/sujal-jangilwar",
    linkedinUrl: "https://www.linkedin.com/in/sujal-jangilwar-21197a3a9/",
  },
  {
    name: "Mr. Siddhesh Hedau",
    role: "Media Head",
    year: "2nd Year",
    image: "/members/sidhesh.jpg",
    linkedinId: "in/sidhesh-hedau",
    linkedinUrl: "https://www.linkedin.com/in/siddhesh-u-hedau-590655430/",
  },
  {
    name: "Mr. Yash Gore",
    role: "Design Head",
    year: "2nd Year",
    image: "/members/yash-g.png",
    linkedinId: "in/yash-gore",
    linkedinUrl: "https://www.linkedin.com/in/yash-gore-5a9878430/",
  },
  {
    name: "Ms. Vidhi Chavhan",
    role: "Joint Event Manager",
    year: "2nd Year",
    image: "/members/vidhi.jpeg",
    linkedinId: "in/vidhi-chavhan",
    linkedinUrl: "https://www.linkedin.com/in/vidhi-chavhan-91085a430/",
  },
  {
    name: "Mr. Spandan Ingale",
    role: "Joint Technical Head",
    year: "2nd Year",
    image: "/members/spandan.jpeg",
    linkedinId: "in/spandan-ingale",
    linkedinUrl: "https://linkedin.com/in/spandan-ingale",
  },
  {
    name: "Ms. Dakshata Kadu",
    role: "Joint Technical Head",
    year: "2nd Year",
    image: "/members/dakshata.jpg",
    linkedinId: "in/dakshata-kadu",
    linkedinUrl: "https://www.linkedin.com/in/dakshata-kadu-3148bb385/",
  },
  {
    name: "Ms. Vedanti Chandore",
    role: "Joint Invitation / PRO Head",
    year: "2nd Year",
    image: "/members/vedanti.jpeg",
    linkedinId: "in/vedanti-chandore",
    linkedinUrl: "https://www.linkedin.com/in/vedanti-chandore-6b15723a5/",
  },
  {
    name: "Ms. Chetna Kamdi",
    role: "Joint Discipline Head",
    year: "2nd Year",
    image: "/members/chetana.png",
    linkedinId: "in/chetana-kamdi",
    linkedinUrl: "https://www.linkedin.com/in/chetana-kamdi-0535823b8/",
  },
  {
    name: "Mr. Vedant Zilpe",
    role: "Joint Sports Head",
    year: "2nd Year",
    image: "/members/vedant-z.png",
    linkedinId: "in/vedant-zilpe",
    linkedinUrl: "https://www.linkedin.com/in/vedant-zilpe-2b944b378/",
  },
  {
    name: "Mr. Mayank Chandrakapure",
    role: "Student Co-ordinator",
    year: "2nd Year",
    image: "/members/mayank.jpeg",
    linkedinId: "in/mayank-chandrakapure",
    linkedinUrl: "https://www.linkedin.com/in/mayank-chandrakapure-3b8a68383/",
  },
  {
    name: "Mr. Harshit Masram",
    role: "Student Co-ordinator",
    year: "2nd Year",
    image: "/members/harshit.png",
    linkedinId: "in/harshit-masram",
    linkedinUrl: "https://www.linkedin.com/in/harshit-masram-b420633ab/",
  },
];

// Complete list of 11 ISF Members
export const isfMembers = [
  {
    name: "Mr. Yash Site",
    role: "Vice President - ISF",
    year: "3rd Year",
    image: "/members/yash-site.jpg",
    linkedinId: "in/yash-site",
    linkedinUrl: "https://www.linkedin.com/in/yash-site-5a52ab375/",
  },
  {
    name: "Mr. Vaibhav Shete",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/vaibhav.png",
    linkedinId: "in/vaibhav-shete",
    linkedinUrl: "https://linkedin.com/in/vaibhav-shete",
  },
  {
    name: "Mr. Awdhesh Chorghade",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/awdhesh.png",
    linkedinId: "in/awdhesh-chorgade",
    linkedinUrl: "https://www.linkedin.com/in/awdheshchorghade/",
  },
  {
    name: "Mr. Yash Makade",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/yash-makade.jpeg",
    linkedinId: "in/yash-makade",
    linkedinUrl: "https://www.linkedin.com/in/yash-makade-6995aa36a/",
  },
  {
    name: "Mr. Himanshu Kukde",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/himanshu-k.jpg",
    linkedinId: "in/himanshu-kukde",
    linkedinUrl: "https://www.linkedin.com/in/himanshu-kukde-72a6053a5/",
  },
  {
    name: "Mr. Soham Nagmote",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/soham.png",
    linkedinId: "in/soham-nagmote",
    linkedinUrl: "https://www.linkedin.com/in/soham-nagmote-b9794b31a/",
  },
  {
    name: "Mr. Himanshu Lokhande",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/himanshu-l.jpg",
    linkedinId: "in/himanshu-lokhande",
    linkedinUrl: "https://www.linkedin.com/in/himanshu-lokhande-6b39a42b3/",
  },
  {
    name: "Ms. Samiksha Thakare",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/samiksha.jpg",
    linkedinId: "in/samiksha-thakare",
    linkedinUrl: "https://www.linkedin.com/in/samiksha-thakre-a61445342/",
  },
  {
    name: "Mr. Aaruni Pisal",
    role: "Member - ISF",
    year: "2nd Year",
    image: "/members/aaruni.jpg",
    linkedinId: "in/aaruni-pisal",
    linkedinUrl: "https://www.linkedin.com/in/aaruni-pisal-31885a430/",
  },
  {
    name: "Mr. Nikhil Shelke",
    role: "Member - ISF",
    year: "2nd Year",
    image: "/members/nikhil.jpeg",
    linkedinId: "in/nikhil-shelke",
    linkedinUrl: "https://www.linkedin.com/in/nikhil-shelke-6756563b3/",
  },
  {
    name: "Ms. Sumedha Indurkar",
    role: "Member - ISF",
    year: "2nd Year",
    image: "/members/sumedha.png",
    linkedinId: "in/sumedha-indurkar",
    linkedinUrl: "https://www.linkedin.com/in/sumedha-indurkar-75a145401/",
  },
];

export const mentors = [
  {
    name: "Mr. Chaitanya Wankhede",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/chaitanyawankhede",
    linkedinUrl: "https://www.linkedin.com/in/chaitanya-wankhede-40a6ba289/",
    image: "/members/m1.jpg",
  },
  {
    name: "Ms. Ayushi Mankar",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/ayushimankar",
    linkedinUrl: "https://www.linkedin.com/in/ayushi-mankar-a70977316/",
    image: "/members/m2.jpg",
  },
  {
    name: "Mr. Soumya Bawane",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/soumyabawane",
    linkedinUrl: "https://www.linkedin.com/in/soumya-bawane-73ba59285/",
    image: "/members/m3.png",
  },
  {
    name: "Mr. Krish Sarode",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/krishsarode",
    linkedinUrl: "https://www.linkedin.com/in/krish-sarode-70392b356/",
    image: "/members/m4.jpg",
  },
];
/* eslint-enable react/only-export-components */

function Team({
  category = null,
  eyebrow,
  title,
  vision,
  showToggle,
  showPresident,
  showMentors,
} = {}) {
  const { isDark } = useTheme();
  const { items: managedTeam, initialized } = usePublicContent("team");
  const scrollRef = useRef(null);
  const isFiltered = category === "FEETA" || category === "ISF";
  const [activeCategory, setActiveCategory] = useState(category || "FEETA");
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const resolvedShowToggle = showToggle ?? !isFiltered;
  const resolvedShowPresident = showPresident ?? !isFiltered;
  const resolvedShowMentors = showMentors ?? !isFiltered;

  const resolvedEyebrow =
    eyebrow ??
    (category === "FEETA"
      ? "Student Forum"
      : category === "ISF"
        ? "Technical Committee"
        : "Our Team");

  const resolvedTitle =
    title ??
    (category === "FEETA"
      ? "FEETA - Student Forum"
      : category === "ISF"
        ? "ISF - Technical Committee"
        : "Meet the ETC Forum");

  const managedMembers = managedTeam.map((item) => ({
    ...item.data,
    name: item.title || item.data.name,
    role: item.data.role || "Member",
    image: item.data.image || "",
    linkedinId: item.data.linkedinId || "",
    linkedinUrl: item.data.linkedinUrl || item.data.socials?.linkedin || "",
    category: item.data.category || activeCategory,
    position: item.data.position || item.data.role || "Mentor",
  }));
  const baseMembers = activeCategory === "FEETA" ? feetaMembers : isfMembers;
  const managedCategoryMembers = managedMembers.filter((member) => member.category === activeCategory && member.role.toLowerCase() !== "president");
  const managedNames = new Set(managedCategoryMembers.map((member) => member.name.toLowerCase()));
  const displayedMembers = initialized ? managedCategoryMembers : [
    ...baseMembers.filter((member) => !managedNames.has(member.name.toLowerCase())),
    ...managedCategoryMembers,
  ];
  const displayedPresident = managedMembers.find((member) => member.role.toLowerCase() === "president" && member.category === activeCategory)
    || managedMembers.find((member) => member.role.toLowerCase() === "president")
    || (initialized ? null : presidentData);
  const dynamicMentors = managedMembers.filter((member) => member.category === "Mentor");
  const displayedMentors = initialized
    ? dynamicMentors
    : mentors;
  const totalDots = 5;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (direction === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        if (scrollLeft <= 0) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  const updatePaginationOnScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const scrollFraction = scrollLeft / maxScroll;
        const newIndex = Math.min(
          Math.floor(scrollFraction * totalDots),
          totalDots - 1
        );
        setActiveDotIndex(newIndex);
      }
    }
  };

  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = (index / (totalDots - 1)) * maxScroll;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveDotIndex(index);
    }
  };

  const getDotStyles = (index) => {
    const distance = Math.abs(index - activeDotIndex);
    if (distance === 0) {
      return isDark
        ? "w-3.5 h-3.5 bg-cyan-400 scale-100 opacity-100 shadow-[0_0_8px_#22d3ee]"
        : "w-3.5 h-3.5 bg-slate-900 scale-100 opacity-100";
    } else if (distance === 1) {
      return isDark
        ? "w-3 h-3 bg-slate-700 scale-90 opacity-80 hover:bg-slate-600"
        : "w-3 h-3 bg-slate-300 scale-90 opacity-80 hover:bg-slate-400";
    } else {
      return isDark
        ? "w-2.5 h-2.5 bg-slate-800 scale-75 opacity-60 hover:bg-slate-700"
        : "w-2.5 h-2.5 bg-slate-200 scale-75 opacity-60 hover:bg-slate-400";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleScroll("right");
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Reset scroll and dot position when category changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    setActiveDotIndex(0);
  }, [activeCategory]);

  return (
    <section
      id="team"
      className="py-28 overflow-hidden transition-colors duration-300 relative bg-[var(--bg-page-alt)] text-[var(--text-primary)]"
    >
      {/* 1. Header & President Section */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="section-header max-w-3xl mx-auto">
          <span className="section-subtitle">
            {resolvedEyebrow}
          </span>
          {isFiltered ? (
            <h2 className="section-title">
              {resolvedTitle}
            </h2>
          ) : (
            <h2 className="section-title">
              Meet the <span className="text-gold-gradient">Committee</span>
            </h2>
          )}

          {vision && (
            <blockquote
              className={`mt-4 italic text-sm sm:text-base leading-relaxed transition-colors max-w-2xl mx-auto ${isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
                }`}
            >
              "{vision}"
            </blockquote>
          )}
        </div>

        {/* Centered President Card (Auron Centerpiece Card) */}
        {resolvedShowPresident && displayedPresident && (
          <div className="mt-8 flex justify-center">
            <div
              className="glass-card w-full max-w-2xl p-8 sm:p-10 text-center flex flex-col items-center group transition-all duration-300"
            >
              <div
                className="overflow-hidden rounded-full h-36 w-36 shadow-lg mb-6 ring-4 ring-[var(--color-gold)] p-1 bg-[var(--bg-card)] transition-transform duration-500 group-hover:scale-105"
              >
                <img
                  src={displayedPresident.image}
                  alt={displayedPresident.name}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>

              <span className="role-badge mb-3">
                {displayedPresident.role}
              </span>

              <h3
                className="text-2xl sm:text-3xl font-extrabold font-heading transition-colors text-[var(--text-heading)] group-hover:text-[var(--color-gold)]"
              >
                {displayedPresident.name}
              </h3>

              <p
                className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1.5 transition-colors ${isDark ? "text-[#6481a5]" : "text-[#6b7c97]"
                  }`}
              >
                {displayedPresident.department || "Department of Electronics & Telecommunication Engineering"} • {displayedPresident.year}
              </p>

              <blockquote
                className={`mt-4 italic text-sm sm:text-base leading-relaxed max-w-lg transition-colors ${isDark ? "text-[#abc4e3]" : "text-[#4a5568]"
                  }`}
              >
                "{displayedPresident.vision || displayedPresident.description || ""}"
              </blockquote>

              {/* LinkedIn Button */}
              <a
                href={displayedPresident.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-105 ${isDark
                    ? "border-[#3b9cff33] bg-[#020b18] text-[#f0f6fc] hover:border-[#3b9cff88] hover:shadow-[0_0_15px_rgba(59,156,255,0.35)]"
                    : "border-[#0d47a126] bg-white text-[#0a1628] hover:border-[#0d47a166] hover:shadow-md"
                  }`}
                aria-label={`Visit ${displayedPresident.name}'s LinkedIn profile`}
              >
                <svg
                  className="h-4 w-4 fill-current text-[var(--color-gold)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.7-2.1 1.75-2.1 1.05 0 1.5.8 1.5 2.1v4.93h2.79M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                </svg>
                <span>{displayedPresident.linkedinId || "LinkedIn profile"}</span>
              </a>
            </div>
          </div>
        )}

        {/* Auron Wing Filter Buttons */}
        {resolvedShowToggle && (
          <div className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => setActiveCategory("ISF")}
              className={`w-full sm:w-auto px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeCategory === "ISF"
                  ? "cta-button"
                  : "secondary-button"
                }`}
            >
              ISF Committee
            </button>

            <button
              onClick={() => setActiveCategory("FEETA")}
              className={`w-full sm:w-auto px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeCategory === "FEETA"
                  ? "cta-button"
                  : "secondary-button"
                }`}
            >
              FEETA Forum
            </button>
          </div>
        )}
      </div>

      {/* 2. Member Carousel */}
      <div
        ref={scrollRef}
        onScroll={updatePaginationOnScroll}
        className="mt-12 flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-6 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayedMembers.map((member, index) => (
          <div key={index} className="w-64 shrink-0">
            <MemberCard member={member} />
          </div>
        ))}
      </div>

      {/* Styled Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        {/* Previous Button */}
        <button
          onClick={() => handleScroll("left")}
          className={`group flex h-12 w-12 items-center justify-center rounded-full shadow-md border transition-all duration-200 active:scale-95 cursor-pointer ${isDark
              ? "bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-cyan-500/50"
              : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:shadow-lg"
            }`}
          aria-label="Previous Members"
        >
          <svg
            className={`h-5 w-5 transition-transform group-hover:-translate-x-0.5 ${isDark ? "text-slate-200" : "text-slate-800"
              }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        {/* Dynamic Dots Navigation */}
        <div className="flex items-center gap-2 px-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 ease-out cursor-pointer ${getDotStyles(
                index
              )}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleScroll("right")}
          className={`group flex h-12 w-12 items-center justify-center rounded-full shadow-md border transition-all duration-200 active:scale-95 cursor-pointer ${isDark
              ? "bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-cyan-500/50"
              : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:shadow-lg"
            }`}
          aria-label="Next Members"
        >
          <svg
            className={`h-5 w-5 transition-transform group-hover:translate-x-0.5 ${isDark ? "text-slate-200" : "text-slate-800"
              }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {/* 3. Mentors Section */}
      {resolvedShowMentors && (
        <div className="mx-auto max-w-7xl px-6 mt-24">
          <div className="text-center">
            <p
              className={`mb-2 text-sm font-semibold uppercase tracking-[0.3em] transition-colors ${isDark ? "text-cyan-400" : "text-blue-600"
                }`}
            >
              Guidance & Leadership
            </p>
            <h3
              className={`text-3xl font-bold sm:text-4xl transition-colors ${isDark ? "text-white" : "text-slate-900"
                }`}
            >
              Our Mentors
            </h3>
            <p
              className={`mt-2 transition-colors ${isDark ? "text-slate-400" : "text-slate-600"
                }`}
            >
              Providing constant support and direction for the forum
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedMentors.map((mentor, index) => (
              <div
                key={index}
                className={`group rounded-2xl p-6 shadow-md border text-center flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isDark
                    ? "bg-slate-900/80 border-slate-800 text-white hover:border-cyan-500/50"
                    : "bg-white border-slate-100 text-slate-900 hover:border-blue-100"
                  }`}
              >
                <div
                  className={`overflow-hidden rounded-full h-28 w-28 shadow-sm mb-4 ring-4 ${isDark ? "ring-cyan-500/20" : "ring-blue-50"
                    }`}
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4
                  className={`text-lg font-bold transition-colors ${isDark
                      ? "text-white group-hover:text-cyan-400"
                      : "text-slate-900 group-hover:text-blue-600"
                    }`}
                >
                  {mentor.name}
                </h4>
                <p
                  className={`text-sm font-medium transition-colors ${isDark ? "text-cyan-400" : "text-blue-600"
                    }`}
                >
                  {mentor.position}
                </p>
                <p
                  className={`text-xs mt-1 font-medium transition-colors ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                  {mentor.year}
                </p>

                <a
                  href={mentor.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold shadow-sm transition-colors ${isDark
                      ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  aria-label={`Visit ${mentor.name}'s LinkedIn profile`}
                >
                  <svg
                    className={`h-4 w-4 fill-current transition-colors ${isDark ? "text-cyan-400" : "text-blue-600"
                      }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.7-2.1 1.75-2.1 1.05 0 1.5.8 1.5 2.1v4.93h2.79M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                  </svg>
                  <span>{mentor.linkedinId}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Team;