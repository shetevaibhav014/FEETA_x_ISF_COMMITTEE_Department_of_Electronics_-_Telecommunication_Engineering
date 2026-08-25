import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashLoader from "./components/SplashLoader";
import Navbar from "./components/Navbar";
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
import InstallationGallery from "./sections/InstallationGallery"; // Added Import

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashLoader onFinish={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/committee-incharge" element={<CommitteeIncharge />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/installation-ceremony" element={<InstallationGallery />} /> {/* Added Route */}
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;