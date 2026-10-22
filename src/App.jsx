import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ToastProvider from "./context/ToastContext";
import SplashLoader from "./components/SplashLoader";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import BackToTop from "./components/BackToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import CommitteeIncharge from "./sections/CommitteeIncharge";
import Activities from "./sections/Activities";
import Events from "./sections/Events";
import Gallery from "./sections/Gallery";
import Achievements from "./sections/Achievements";
import Team from "./sections/Team";
import Community from "./sections/Community";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import NotFound from "./sections/NotFound";
import InstallationGallery from "./sections/InstallationGallery";
import AdminLogin from "./sections/AdminLogin";
import AdminDashboard from "./sections/AdminDashboard";
import LegalPage from "./sections/LegalPage";
import ResourcesPage from "./sections/ResourcesPage";
import AnnouncementsPage from "./sections/AnnouncementsPage";
import usePublicContent from "./hooks/usePublicContent";
import { useEffect } from "react";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  const { items: seoEntries } = usePublicContent("seo");

  useEffect(() => {
    const seo = seoEntries.find((item) => item.data.path === pathname);
    const setMeta = (selector, attribute, key, value) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, key);
        document.head.append(meta);
      }
      meta.content = value;
    };
    const defaultTitle = "FEETA & ISF COMMITTEE - Department of Electronics & Telecommunication Engineering";
    const defaultDescription = "The FEETA and ISF Committee of the Department of Electronics & Telecommunication Engineering.";
    document.title = seo?.data.title || seo?.title || defaultTitle;
    setMeta('meta[name="description"]', "name", "description", seo?.data.description || defaultDescription);
    setMeta('meta[property="og:title"]', "property", "og:title", document.title);
    setMeta('meta[property="og:description"]', "property", "og:description", seo?.data.description || defaultDescription);
    if (seo?.data.socialImage) setMeta('meta[property="og:image"]', "property", "og:image", seo.data.socialImage);
  }, [pathname, seoEntries]);

  if (loading) return <SplashLoader onFinish={() => setLoading(false)} />;

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="background-grain" />
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/reset-password" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/committee-incharge" element={<CommitteeIncharge />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/installation-ceremony" element={<InstallationGallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/team" element={<Team />} />
          <Route path="/community" element={<Community />} />
          <Route
            path="/feeta"
            element={
              <Team
                category="FEETA"
                vision="To build an inclusive ecosystem driving technical innovation, student leadership, and impactful collaboration through the FEETA Student Forum."
              />
            }
          />
          <Route
            path="/isf"
            element={
              <Team
                category="ISF"
                vision="To advance technical excellence and hands-on engineering culture among students through the ISF Technical Committee."
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && <BackToTop />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
