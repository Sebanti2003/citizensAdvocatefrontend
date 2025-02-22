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
      <HeroSection />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Key Features */}
      <Features />
      
      {/* Ministries & Categories */}
      <Ministries />
      
      {/* Government Benefits */}
      <GovernmentBenefits />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Dark Mode Toggle (Global) */}
      <div className="fixed bottom-5 right-5">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default LandingPage;
