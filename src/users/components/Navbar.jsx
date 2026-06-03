// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { motion } from "framer-motion";
// import logo from "@/assets/logo.png";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const lastScrollY = useRef(window.scrollY);
//   const navigate=useNavigate();
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY.current) {
//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const navbarHeight = 80; // Approximate navbar height
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth"
//       });
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const navLinks = [
//     { name: "Home", id: "hero" },
//     { name: "How It Works", id: "how-it-works" },
//     { name: "Features", id: "features" },
//     { name: "Ministries", id: "ministries" },
//     { name: "Govt. Benefits", id: "gov-benefits" },
//     { name: "FAQ", id: "faq" },
//     { name: "Contact", id: "contact" },
//   ];

//   return (
//     <motion.nav
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
//         isVisible ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="w-full px-5 py-2 flex justify-between items-center bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-lg">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="Logo" className="h-8" />
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex items-center space-x-5 text-sm font-bold w-full justify-end font-medium">
//           {navLinks.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => scrollToSection(item.id)}
//               className="relative text-blue-900 hover:text-blue-600 transition-all duration-300 font-semibold"
//             >
//               {item.name}
//             </button>
//           ))}

//           {/* CTA Buttons */}
//           <a
//             href="/govt/EmployeeRegistration"
//             className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
//           >
//             Employee Dashboard
//           </a>
//           <a
//             href="/govt/login"
//             className="px-3 py-1 bg-orange-500 text-white rounded-md text-xs hover:bg-orange-600"
//           >
//             🏛️ Government Login
//           </a>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-blue-900"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-gradient-to-b from-orange-500 via-white to-green-600 py-2 px-3 flex flex-col space-y-2 shadow-lg text-xs">
//           {navLinks.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => scrollToSection(item.id)}
//               className="text-blue-900 font-semibold hover:text-blue-600 text-left"
//             >
//               {item.name}
//             </button>
//           ))}
//           <div
            
//             className="px-3 py-1 bg-orange-500 text-white rounded-md text-center text-xs hover:bg-orange-600 font-semibold"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             📢 File a Complaint
//           </div>
//           <a
//             href="/govt/login"
//             className="px-3 py-1 bg-orange-500 text-white rounded-md text-center text-xs hover:bg-orange-600 font-semibold"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             🏛️ Government Login
//           </a>
//         </div>
//       )}
//     </motion.nav>
//   );
// };

// export default Navbar;
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const navigate=useNavigate();
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
      const navbarHeight = 80;
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
        {/* Citizens' Advocate Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg
            viewBox="0 0 48 48"
            className="w-10 h-10 drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            aria-label="Citizens' Advocate Logo"
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Shield body */}
            <path
              d="M24 2 L42 8 V24 C42 35 34 43 24 46 C14 43 6 35 6 24 V8 Z"
              fill="url(#shieldGrad)"
              stroke="#FFFFFF"
              strokeWidth="1.2"
            />
            {/* Saffron top band */}
            <path d="M24 2 L42 8 V12 L24 8 L6 12 V8 Z" fill="#FF9933" />
            {/* Green bottom band */}
            <path
              d="M9 34 C13 40 18 44 24 46 C30 44 35 40 39 34 Z"
              fill="#138808"
            />
            {/* Ashoka Chakra ring */}
            <circle
              cx="24"
              cy="23"
              r="6.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
            />
            {/* Chakra spokes */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              return (
                <line
                  key={i}
                  x1="24"
                  y1="23"
                  x2={24 + 6.5 * Math.cos(angle)}
                  y2={23 + 6.5 * Math.sin(angle)}
                  stroke="#FFFFFF"
                  strokeWidth="0.7"
                />
              );
            })}
            <circle cx="24" cy="23" r="1.3" fill="#FFFFFF" />
          </svg>
          <div className="hidden sm:flex flex-col leading-none font-['Oswald'] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            <span className="text-white font-extrabold text-sm tracking-wide">
              CITIZENS&apos;
            </span>
            <span className="text-white font-extrabold text-base tracking-wider -mt-0.5">
              ADVOCATE
            </span>
          </div>
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
          <div
            onClick={()=>{navigate('/govt/employee/login')}} className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
          >
            Employee Dashboard
          </div>
          <div
            onClick={()=>{navigate('/govt/login')}} className="px-3 py-1 bg-orange-500 text-white rounded-md text-xs hover:bg-orange-600"
          >
            🏛️ Government Login
          </div>
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
