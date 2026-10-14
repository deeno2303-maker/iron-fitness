import Header from "./components/Header";
import Hero from "./components/Hero";
import GymShowcase from "./components/GymShowcase";
import Schedule from "./components/Schedule";
import Trainers from "./components/Trainers";
import Membership from "./components/Membership";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <GymShowcase />
        <Schedule />
        <Trainers />
        <Membership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
