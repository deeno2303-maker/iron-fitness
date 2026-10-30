import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import CheckoutSuccess from "./components/CheckoutSuccess";
import CheckoutCancelled from "./components/CheckoutCancelled";

export default function App() {
  const checkoutState = new URLSearchParams(window.location.search).get("checkout");

  return (
    <AuthProvider>
      {checkoutState === "success" ? (
        <CheckoutSuccess />
      ) : checkoutState === "cancelled" ? (
        <CheckoutCancelled />
      ) : (
        <>
          <Header />
          <Hero />
          <MainContent />
          <Footer />
        </>
      )}
      <AuthModal />
    </AuthProvider>
  );
}
