import Schedule from "./Schedule";
import GymShowcase from "./GymShowcase";
import Trainers from "./Trainers";
import Membership from "./Membership";
import Contact from "./Contact";

export default function MainContent() {
  return (
    <main id="main">
      <Schedule />
      <GymShowcase />
      <Trainers />
      <Membership />
      <Contact />
    </main>
  );
}
