import { events } from "../sections/Events";
import { photos } from "../sections/Gallery";
import { feetaMembers, isfMembers, mentors, presidentData } from "../sections/Team";

const record = (type, title, data, position = 0) => ({
  type,
  title,
  data,
  status: "published",
  visible: true,
  position,
});

const memberRecords = (members, category) => members.map((member, index) => record(
  "team",
  member.name,
  {
    role: member.role,
    category,
    year: member.year,
    image: member.image,
    alt: member.name,
    linkedinId: member.linkedinId,
    linkedinUrl: member.linkedinUrl,
  },
  index,
));

export const defaultAdminContent = [
  record("hero", "FEETA x ISF", {
    description: "A platform for students to learn, innovate, collaborate and lead through technology and teamwork.",
    primaryCta: "Explore Community",
    primaryUrl: "/community",
    secondaryCta: "Meet the Committee",
    secondaryUrl: "/team",
  }),
  record("about", "Empowering Students Through Technology", {
    description: "The ETC Department Forum is a student-driven platform that encourages innovation, technical learning, leadership and collaboration among Electronics and Telecommunication Engineering students.",
  }),
  record("team", presidentData.name, {
    role: presidentData.role,
    category: "FEETA",
    department: presidentData.department,
    year: presidentData.year,
    vision: presidentData.vision,
    image: presidentData.image,
    alt: presidentData.name,
    linkedinId: presidentData.linkedinId,
    linkedinUrl: presidentData.linkedinUrl,
  }),
  ...memberRecords(feetaMembers, "FEETA"),
  ...memberRecords(isfMembers, "ISF"),
  ...mentors.map((mentor, index) => record("team", mentor.name, {
    role: "Mentor",
    position: mentor.position,
    category: "Mentor",
    year: mentor.year,
    image: mentor.image,
    alt: mentor.name,
    linkedinId: mentor.linkedinId,
    linkedinUrl: mentor.linkedinUrl,
  }, index)),
  ...events.map((event, index) => record("events", event.title, {
    date: event.date,
    month: event.month,
    description: event.description,
    category: event.category,
    isAvailable: event.isAvailable,
  }, index)),
  ...photos.map((photo, index) => record("gallery", photo.title, {
    image: photo.image,
    alt: photo.title,
    category: photo.category,
  }, index)),
  record("event-popup", "Installation Ceremony", {
    eyebrow: "Featured Event",
    description: "Take a look at the official highlights, photos, and memorable moments from our ETC Department Installation Ceremony!",
    url: "/installation-ceremony",
    buttonText: "View Photos",
    enabled: true,
  }),
  record("footer", "Footer details", {
    email: "etcforum@sbjit.edu.in",
    phone: "+91 94059 05318",
    linkedin: "https://www.linkedin.com/company/feeta-forum/about/",
    instagram: "https://www.instagram.com/officialfeeta",
    links: [],
  }),
];
