import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <MainContent />
      </main>
      <Footer />
    </>
  );
}
