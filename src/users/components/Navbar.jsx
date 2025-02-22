import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-all`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side - Logo */}
        <Link to="/" className="text-2xl font-bold dark:text-white">
          Citizen’s Advocate
        </Link>

        {/* Right Side - Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link to="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400">How It Works</Link>
          <Link to="#features" className="hover:text-blue-600 dark:hover:text-blue-400">Features</Link>
          <Link to="#ministries" className="hover:text-blue-600 dark:hover:text-blue-400">Ministries</Link>
          <Link to="#gov-benefits" className="hover:text-blue-600 dark:hover:text-blue-400">Govt. Benefits</Link>
          <Link to="#faq" className="hover:text-blue-600 dark:hover:text-blue-400">FAQ</Link>
          <Link to="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
          
          {/* Dropdown for Ministries */}
          <div className="relative group">
            <button className="hover:text-blue-600 dark:hover:text-blue-400">Ministries ▼</button>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48">
              <Link to="/user/railwaydashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">🚆 Railways</Link>
              <Link to="/user/healthfamilydashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">🏥 Health</Link>
              <Link to="/user/roadtransportdashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">🚗 Transport</Link>
              <Link to="/user/educationdashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">🎓 Education</Link>
              <Link to="/user/consumeraffairsdashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">🛍️ Consumer</Link>
              <Link to="/user/womenchilddashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">👩‍👧 Women & Child</Link>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="ml-4">
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-600" />}
          </button>

          {/* CTA Buttons */}
          <Link to="/user/selectcategory" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            📢 File a Complaint
          </Link>
          <Link to="/govt/login" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            🏛️ Government Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-6 flex flex-col space-y-4 shadow-lg">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
          <Link to="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
          <Link to="#ministries" onClick={() => setIsMobileMenuOpen(false)}>Ministries</Link>
          <Link to="#gov-benefits" onClick={() => setIsMobileMenuOpen(false)}>Govt. Benefits</Link>
          <Link to="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <Link to="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/user/selectcategory" className="px-4 py-2 bg-blue-600 text-white rounded-md text-center" onClick={() => setIsMobileMenuOpen(false)}>
            📢 File a Complaint
          </Link>
          <Link to="/govt/login" className="px-4 py-2 bg-green-600 text-white rounded-md text-center" onClick={() => setIsMobileMenuOpen(false)}>
            🏛️ Government Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
