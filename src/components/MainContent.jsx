import Hero from "./Hero";
import GymShowcase from "./GymShowcase";
import Schedule from "./Schedule";
import Trainers from "./Trainers";
import Membership from "./Membership";
import Contact from "./Contact";

export default function MainContent() {
  return (
    <>
      <Hero />
      <GymShowcase />
      <Schedule />
      <Trainers />
      <Membership />
      <Contact />
    </>
  );
}
