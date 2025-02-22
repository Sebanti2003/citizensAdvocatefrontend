import { useState, useEffect } from "react";
import { useNavigate } from "react-router";  // Import useNavigate hook
import Footer from './Footer'; // Import the Footer component
import flagVideo from '@/assets/tricolor.mp4';
// import About from "../pages/About"; // Import About component

export default function LandingPage() {
  const [showAbout, setShowAbout] = useState(false); // State to manage modal visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);

  // Handle navigation when buttons are clicked
  const handleCitizenClick = () => {
    navigate('/user/login'); // Navigate to the UserLogin page
  };

  const handleGovtClick = () => {
    navigate('/govt/login'); // Navigate to the GovtLogin page
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={flagVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      
      {/* Header Section */}
      <div className="relative z-20 text-white text-center px-6 md:px-20">
        <header className="absolute top-0 left-0 w-full py-6">
          <h1 className="text-4xl font-bold">Citizen&apos;s Advocate</h1>
          <p className="text-xl mt-2">Empowering Citizens, Streamlining Solutions</p>
        </header>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-white text-center px-6 md:px-20 flex flex-col items-center justify-center h-full">
        {/* Login Section */}
        <section id="login" className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-4">Login as:</h2>
          <div className="space-y-4">
            <button 
              onClick={handleCitizenClick} // Handle Citizen button click
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Citizen of India
            </button>
            <button 
              onClick={handleGovtClick} // Handle Govt button click
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Government of India
            </button>
          </div>
        </section>
      </div>

      {/* About Us Modal */}
      {showAbout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative">
            <button 
              onClick={() => setShowAbout(false)} // Close the modal
              className="absolute top-0 right-0 p-4 text-xl font-bold text-black"
            >
              &times; {/* Close button */}
            </button>
            {/* <About /> This will render the content of About.jsx */}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer /> {/* Use the Footer component here */}
    </div>
  );
}
