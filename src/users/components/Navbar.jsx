import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });
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

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
        {/* Logo on the left */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-5 text-xs w-full justify-end font-medium">
          {[
            { name: "Home", href: "/" },
            { name: "How It Works", href: "#how-it-works" },
            { name: "Features", href: "#features" },
            { name: "Ministries", href: "#ministries" },
            { name: "Govt. Benefits", href: "#gov-benefits" },
            { name: "FAQ", href: "#faq" },
            { name: "Contact", href: "#contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="relative text-blue-900 hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              {item.name}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-blue-900 p-1 rounded-full"
          >
            {darkMode ? (
              <Sun className="text-yellow-500" size={14} />
            ) : (
              <Moon className="text-gray-300" size={14} />
            )}
          </button>

          {/* CTA Buttons */}
          <Link
            to="/user/login"
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
          >
            📢 File a Complaint
          </Link>
          <Link
            to="/govt/login"
            className="px-3 py-1 bg-orange-500 text-white rounded-md text-xs hover:bg-orange-600"
          >
            🏛️ Government Login
          </Link>
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
          {[
            { name: "Home", href: "/" },
            { name: "How It Works", href: "#how-it-works" },
            { name: "Features", href: "#features" },
            { name: "Ministries", href: "#ministries" },
            { name: "Govt. Benefits", href: "#gov-benefits" },
            { name: "FAQ", href: "#faq" },
            { name: "Contact", href: "#contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-blue-900 font-semibold hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/user/selectcategory"
            className="px-3 py-1 bg-orange-500 text-white rounded-md text-center text-xs hover:bg-orange-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📢 File a Complaint
          </Link>
          <Link
            to="/govt/login"
            className="px-3 py-1 bg-orange-500 text-white rounded-md text-center text-xs hover:bg-orange-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🏛️ Government Login
          </Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
