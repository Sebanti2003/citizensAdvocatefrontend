import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Features", id: "features" },
    { name: "Ministries", id: "ministries" },
    { name: "Govt. Benefits", id: "gov-benefits" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-5 py-2 flex justify-between items-center bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-5 text-sm font-bold w-full justify-end font-medium">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="relative text-blue-900 hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              {item.name}
            </button>
          ))}

          {/* CTA Buttons */}
          <a
            href="/user/login"
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
          >
            👤 Employee Registration
          </a>
          <a
            href="/govt/login"
            className="px-3 py-1 bg-orange-500 text-white rounded-md text-xs hover:bg-orange-600"
          >
            🏛️ Government Login
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-orange-500 via-white to-green-600 py-2 px-3 flex flex-col space-y-2 shadow-lg text-xs">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="text-blue-900 font-semibold hover:text-blue-600 text-left"
            >
              {item.name}
            </button>
          ))}
          <a
            href="/user/selectcategory"
            className="px-3 py-1 bg-orange-500 text-white rounded-md text-center text-xs hover:bg-orange-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📢 File a Complaint
          </a>
          <a
            href="/govt/login"
            className="px-3 py-1 bg-orange-500 text-white rounded-md text-center text-xs hover:bg-orange-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🏛️ Government Login
          </a>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;