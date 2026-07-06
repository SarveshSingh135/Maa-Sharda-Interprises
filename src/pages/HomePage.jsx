import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Offers from "../components/Offers";
import Brands from "../components/Brands";
import Reviews from "../components/Reviews";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import Navbar from "../components/Navbar";
import "../App.css";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Offers />
      <Brands />
      <Reviews />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <Navbar /> 
    </>
  );
}

