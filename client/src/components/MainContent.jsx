import Schedule from "./Schedule";
import GymShowcase from "./GymShowcase";
import Trainers from "./Trainers";
import Membership from "./Membership";
import Contact from "./Contact";
import WhatToExpect from "./WhatToExpect";

export default function MainContent() {
  return (
    <main id="main">
      <WhatToExpect />
      <Schedule />
      <GymShowcase />
      <Trainers />
      <Membership />
      <Contact />
    </main>
  );
}
