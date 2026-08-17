import React, { useRef, useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";

const presidentData = {
  name: "Tushar Thakare",
  role: "President",
  department: "Department of Electronics & Telecommunication Engineering",
  year: "3rd Year",
  vision:
    "To build an inclusive ecosystem driving technical innovation, student leadership, and impactful collaboration across the ETC forum.",
  image: "/members/a.png",
  linkedinId: "in/tushar-thakare",
  linkedinUrl: "https://linkedin.com/in/tushar-thakare",
};

// Complete list of 21 FEETA Members
const feetaMembers = [
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
    linkedinUrl: "https://linkedin.com/in/prathmesh-kharalkar",
  },
  {
    name: "Ms. Tanvi Wankhede",
    role: "Joint Secretary",
    year: "2nd Year",
    image: "/members/tanvi.png",
    linkedinId: "in/tanvi-wankhede",
    linkedinUrl: "https://linkedin.com/in/tanvi-wankhede",
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
    linkedinUrl: "https://linkedin.com/in/pratham-banode",
  },
  {
    name: "Mr. Vansh Gawande",
    role: "Event Manager",
    year: "3rd Year",
    image: "/members/vansh.png",
    linkedinId: "in/vansh-gawande",
    linkedinUrl: "https://linkedin.com/in/vansh-gawande",
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
    image: "/members/vidisha.png",
    linkedinId: "in/vidisha-bhadang",
    linkedinUrl: "https://linkedin.com/in/vidisha-bhadang",
  },
  {
    name: "Mr. Piyush Bawankar",
    role: "Sports Head",
    year: "3rd Year",
    image: "/members/piyush.jpeg",
    linkedinId: "in/piyush-bawankar",
    linkedinUrl: "https://linkedin.com/in/piyush-bawankar",
  },
  {
    name: "Mr. Somesh Khangare",
    role: "Discipline Head",
    year: "3rd Year",
    image: "/members/somesh.png",
    linkedinId: "in/somesh-khangare",
    linkedinUrl: "https://linkedin.com/in/somesh-khangare",
  },
  {
    name: "Mr. Sujal Jangilwar",
    role: "Media Head",
    year: "2nd Year",
    image: "/members/sujal.png",
    linkedinId: "in/sujal-jangilwar",
    linkedinUrl: "https://linkedin.com/in/sujal-jangilwar",
  },
  {
    name: "Mr. Sidhesh Hedau",
    role: "Media Head",
    year: "2nd Year",
    image: "/members/sidhesh.png",
    linkedinId: "in/sidhesh-hedau",
    linkedinUrl: "https://linkedin.com/in/sidhesh-hedau",
  },
  {
    name: "Mr. Yash Gore",
    role: "Design Head",
    year: "2nd Year",
    image: "/members/yash.png",
    linkedinId: "in/yash-gore",
    linkedinUrl: "https://linkedin.com/in/yash-gore",
  },
  {
    name: "Ms. Vidhi Chavhan",
    role: "Joint Event Manager",
    year: "2nd Year",
    image: "/members/vidhi.jpg",
    linkedinId: "in/vidhi-chavhan",
    linkedinUrl: "https://linkedin.com/in/vidhi-chavhan",
  },
  {
    name: "Mr. Spandan Ingale",
    role: "Joint Technical Head",
    year: "2nd Year",
    image: "/members/spandan.png",
    linkedinId: "in/spandan-ingale",
    linkedinUrl: "https://linkedin.com/in/spandan-ingale",
  },
  {
    name: "Ms. Dakshata Kadu",
    role: "Joint Technical Head",
    year: "2nd Year",
    image: "/members/dakshata.jpg",
    linkedinId: "in/dakshata-kadu",
    linkedinUrl: "https://linkedin.com/in/dakshata-kadu",
  },
  {
    name: "Ms. Vedanti Chandore",
    role: "Joint Invitation & Reception / PRO Head",
    year: "2nd Year",
    image: "/members/vedanti.jpg",
    linkedinId: "in/vedanti-chandore",
    linkedinUrl: "https://linkedin.com/in/vedanti-chandore",
  },
  {
    name: "Ms. Chetana Kamdi",
    role: "Joint Discipline Head",
    year: "2nd Year",
    image: "/members/chetana.png",
    linkedinId: "in/chetana-kamdi",
    linkedinUrl: "https://linkedin.com/in/chetana-kamdi",
  },
  {
    name: "Mr. Vedant Zilpe",
    role: "Joint Sports Head",
    year: "2nd Year",
    image: "/members/vedant-z.png",
    linkedinId: "in/vedant-zilpe",
    linkedinUrl: "https://linkedin.com/in/vedant-zilpe",
  },
  {
    name: "Mr. Mayank Chandrakapure",
    role: "Student Co-ordinator",
    year: "2nd Year",
    image: "/members/mayank.jpg",
    linkedinId: "in/mayank-chandrakapure",
    linkedinUrl: "https://linkedin.com/in/mayank-chandrakapure",
  },
  {
    name: "Mr. Harshit Masram",
    role: "Student Co-ordinator",
    year: "2nd Year",
    image: "/members/harshit.jpg",
    linkedinId: "in/harshit-masram",
    linkedinUrl: "https://linkedin.com/in/harshit-masram",
  },
];

// Complete list of 11 ISF Members
const isfMembers = [
  {
    name: "Mr. Yash Site",
    role: "Vice President - ISF",
    year: "3rd Year",
    image: "/members/yash-site.jpg",
    linkedinId: "in/yash-site",
    linkedinUrl: "https://linkedin.com/in/yash-site",
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
    name: "Mr. Awdhesh Chorgade",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/awdhesh.png",
    linkedinId: "in/awdhesh-chorgade",
    linkedinUrl: "https://linkedin.com/in/awdhesh-chorgade",
  },
  {
    name: "Mr. Yash Makade",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/yash-makade.png",
    linkedinId: "in/yash-makade",
    linkedinUrl: "https://linkedin.com/in/yash-makade",
  },
  {
    name: "Mr. Himanshu Kukde",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/himanshu-k.png",
    linkedinId: "in/himanshu-kukde",
    linkedinUrl: "https://linkedin.com/in/himanshu-kukde",
  },
  {
    name: "Mr. Soham Nagmote",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/soham.png",
    linkedinId: "in/soham-nagmote",
    linkedinUrl: "https://linkedin.com/in/soham-nagmote",
  },
  {
    name: "Mr. Himanshu Lokhande",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/himanshu-l.jpg",
    linkedinId: "in/himanshu-lokhande",
    linkedinUrl: "https://linkedin.com/in/himanshu-lokhande",
  },
  {
    name: "Ms. Samiksha Thakare",
    role: "Member - ISF",
    year: "3rd Year",
    image: "/members/samiksha.png",
    linkedinId: "in/samiksha-thakare",
    linkedinUrl: "https://linkedin.com/in/samiksha-thakare",
  },
  {
    name: "Mr. Aaruni Pisal",
    role: "Member - ISF",
    year: "2nd Year",
    image: "/members/aaruni.jpg",
    linkedinId: "in/aaruni-pisal",
    linkedinUrl: "https://linkedin.com/in/aaruni-pisal",
  },
  {
    name: "Mr. Nikhil Shelke",
    role: "Member - ISF",
    year: "2nd Year",
    image: "/members/nikhil.png",
    linkedinId: "in/nikhil-shelke",
    linkedinUrl: "https://linkedin.com/in/nikhil-shelke",
  },
  {
    name: "Ms. Sumedha Indurkar",
    role: "Member - ISF",
    year: "2nd Year",
    image: "/members/sumedha.png",
    linkedinId: "in/sumedha-indurkar",
    linkedinUrl: "https://linkedin.com/in/sumedha-indurkar",
  },
];

const mentors = [
  {
    name: "MR. CHAITYANYA WANKHEDE",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/mentor-one",
    linkedinUrl: "https://linkedin.com/in/mentor-one",
    image: "/members/m1.png",
  },
  {
    name: "MS. AYUSHI MANKAR",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/mentor-two",
    linkedinUrl: "https://linkedin.com/in/mentor-two",
    image: "/members/m2.jpg",
  },
  {
    name: "MR. SOUMYA BAWANE",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/mentor-three",
    linkedinUrl: "https://linkedin.com/in/mentor-three",
    image: "/members/m3.jpg",
  },
  {
    name: "MR. KRISH SALODE",
    position: "Mentor",
    year: "4th Year",
    linkedinId: "in/mentor-four",
    linkedinUrl: "https://linkedin.com/in/mentor-four",
    image: "/members/m4.PNG",
  },
];

// category: "FEETA" | "ISF" | null (null/undefined = full team page with toggle)
function Team({
  category = null,
  eyebrow,
  title,
  vision,
  showToggle,
  showPresident,
  showMentors,
} = {}) {
  const scrollRef = useRef(null);
  const isFiltered = category === "FEETA" || category === "ISF";
  const [activeCategory, setActiveCategory] = useState(category || "FEETA"); // "FEETA" or "ISF"

  const resolvedShowToggle = showToggle ?? !isFiltered;
  const resolvedShowPresident = showPresident ?? !isFiltered;
  const resolvedShowMentors = showMentors ?? !isFiltered;

  const resolvedEyebrow =
    eyebrow ?? (category === "FEETA" ? "Student Forum" : category === "ISF" ? "Technical Committee" : "Our Team");

  const resolvedTitle =
    title ??
    (category === "FEETA"
      ? "FEETA - Student Forum"
      : category === "ISF"
      ? "ISF - Technical Committee"
      : "Meet the ETC Forum");

  const displayedMembers = activeCategory === "FEETA" ? feetaMembers : isfMembers;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
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

  useEffect(() => {
    const timer = setInterval(() => {
      handleScroll("right");
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="team" className="bg-slate-50 py-24 overflow-hidden">
      {/* 1. Header & President Section */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            {resolvedEyebrow}
          </p>
          {isFiltered ? (
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {resolvedTitle}
            </h2>
          ) : (
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Meet the <span className="text-blue-600">ETC Forum</span>
            </h2>
          )}

          {vision && (
            <blockquote className="mt-6 italic text-slate-600 text-sm sm:text-base leading-relaxed">
              "{vision}"
            </blockquote>
          )}
        </div>

        {/* Centered President Card */}
        {resolvedShowPresident && (
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center flex flex-col items-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="overflow-hidden rounded-full h-36 w-36 ring-4 ring-blue-500/20 shadow-md mb-6">
                <img
                  src={presidentData.image}
                  alt={presidentData.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                {presidentData.role}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {presidentData.name}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {presidentData.department} • {presidentData.year}
              </p>

              <blockquote className="mt-4 italic text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
                "{presidentData.vision}"
              </blockquote>
            </div>
          </div>
        )}

        {/* Category Toggle Buttons */}
        {resolvedShowToggle && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => setActiveCategory("ISF")}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-md ${
                activeCategory === "ISF"
                  ? "bg-blue-600 text-white border border-blue-600 shadow-blue-500/25"
                  : "bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              ISF Members 
            </button>

            <button
              onClick={() => setActiveCategory("FEETA")}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-md ${
                activeCategory === "FEETA"
                  ? "bg-blue-600 text-white border border-blue-600 shadow-blue-500/25"
                  : "bg-white text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              FEETA Members
            </button>
          </div>
        )}
      </div>

      {/* 2. Member Carousel */}
      <div
        ref={scrollRef}
        className="mt-12 flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-6 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayedMembers.map((member, index) => (
          <div key={index} className="w-64 shrink-0">
            <MemberCard member={member} />
          </div>
        ))}
      </div>

      {/* Scroll Control Buttons */}
      <div className="mt-8 flex justify-center items-center gap-6">
        <span
          onClick={() => handleScroll("left")}
          className="cursor-pointer text-2xl font-bold tracking-widest text-slate-500 transition-all duration-300 hover:text-blue-600 hover:scale-125 hover:-translate-x-1 active:scale-95 select-none"
          aria-label="Previous Members"
          role="button"
          tabIndex={0}
        >
          &lt;&lt;
        </span>

        <span className="text-slate-300 font-light select-none">• • • • •</span>

        <span
          onClick={() => handleScroll("right")}
          className="cursor-pointer text-2xl font-bold tracking-widest text-slate-500 transition-all duration-300 hover:text-blue-600 hover:scale-125 hover:translate-x-1 active:scale-95 select-none"
          aria-label="Next Members"
          role="button"
          tabIndex={0}
        >
          &gt;&gt;
        </span>
      </div>

      {/* 3. Mentors Section */}
      {resolvedShowMentors && (
        <div className="mx-auto max-w-7xl px-6 mt-24">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              Guidance & Leadership
            </p>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Mentors
            </h3>
            <p className="mt-2 text-slate-600">
              Providing constant support and direction for the forum
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-100"
              >
                <div className="overflow-hidden rounded-full h-28 w-28 ring-4 ring-blue-50 shadow-sm mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {mentor.name}
                </h4>
                <p className="text-sm font-medium text-blue-600">{mentor.position}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{mentor.year}</p>

                <a
                  href={mentor.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs font-semibold shadow-sm hover:shadow-md hover:scale-105"
                  aria-label={`Visit ${mentor.name}'s LinkedIn profile`}
                >
                  <svg
                    className="h-4 w-4 fill-current text-blue-600 group-hover:text-white transition-colors"
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