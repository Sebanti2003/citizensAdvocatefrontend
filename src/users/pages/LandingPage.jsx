import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Ministries from "../components/Ministries";
import GovernmentBenefits from "../components/GovernmentBenefits";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import ScrollToTop from "../components/ScrollToTop";
import DarkModeToggle from "../components/DarkModeToggle";

const LandingPage = () => {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>
      
      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      {/* Key Features */}
      <section id="features">
        <Features />
      </section>
      
      {/* Ministries & Categories */}
      <section id="ministries">
        <Ministries />
      </section>
      
      {/* Government Benefits */}
      <section id="gov-benefits">
        <GovernmentBenefits />
      </section>
      
      {/* FAQ Section */}
      <section id="faq">
        <FAQ />
      </section>
      
      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Dark Mode Toggle (Global) - Commented out for now */}
      {/* <DarkModeToggle /> */}
    </div>
  );
};

export default LandingPage;