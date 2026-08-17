import About from "./About";
import CommitteeIncharge from "./CommitteeIncharge";
import Activities from "./Activities";
import Events from "./Events";
import Gallery from "./Gallery";
import Achievements from "./Achievements";

// Combines every "about the community" section into one page.
// Used by the Hero's "Explore Community" button, which opens this in a new tab.
function Community() {
  return (
    <>
      <About />
      <CommitteeIncharge />
      <Activities />
      <Events />
      <Gallery />
      <Achievements />
    </>
  );
}

export default Community;
