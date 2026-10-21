import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <Hero />
      <MainContent />
      <Footer />
      <AuthModal />
    </AuthProvider>
  );
}
