import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleFileComplaint = () => {
    navigate('/user/login');
  };

  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-between px-16 py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            #FFFFFF 0%,
            rgba(255, 153, 51, 0.1) 50%,
            rgba(255, 153, 51, 0.3) 75%,
            rgba(255, 153, 51, 0.6) 100%
          )`,
        }}
      />
      {/* Grid Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(#003366 1px, transparent 1px),
                            linear-gradient(90deg, #003366 1px, transparent 1px)`,
          backgroundSize: "70px 40px",
          opacity: 0.1,
        }}
      />
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-[60%] text-center md:text-left relative z-10 font-['Oswald']"
      >
        <h1 className="text-[5vw] font-extrabold text-orange-600 uppercase glossy-text">
          Citizens'
        </h1>
        <h1 className="text-[7vw] font-extrabold text-blue-900 uppercase glossy-text">
          Advocate
        </h1>
        <p className="text-[2.5vw] text-green-700 mt-6 font-semibold glossy-text">
          Empowering Citizens, Strengthening Governance.
        </p>
        <p className="text-[1.5vw] text-gray-700 mt-4 max-w-2xl glossy-text">
          A centralized platform for filing complaints across multiple ministries with ease.
        </p>
        <div className="mt-16 flex gap-12">
          <button
            onClick={handleFileComplaint}
            className="glow-button">
            📢 File a Complaint
          </button>
          <button className="glow-button outline">
            📖 Learn More
          </button>
        </div>
      </motion.div>
      
      {/* 3D Model Using Model Viewer */}
      <div className="w-full md:w-[40%] h-[60vh] flex justify-center items-center mt-10 md:mt-0 relative z-10">
        <model-viewer 
          src="/ashoka_chakra.glb" 
          alt="Ashoka Chakra 3D Model"
          auto-rotate 
          auto-rotate-delay="0"
          rotation-per-second="30deg"
          disable-zoom
          disable-pan
          disable-tap
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Button & Text Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');

          /* Text Pulse Animation */
          @keyframes pulse {
            0% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
            50% { text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5); }
            100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
          }

          .glossy-text {
            animation: pulse 2s infinite;
          }

          .glow-button {
            padding: 1vw 2vw;
            font-size: 1.5vw;
            font-weight: bold;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            color: white;
            background-color: #007BFF;
            border: none;
            border-radius: 12px;
            box-shadow: 0px 0px 20px rgba(0, 123, 255, 0.6);
            position: relative;
            transition: all 0.3s ease-in-out;
            overflow: hidden;
            cursor: pointer;
          }

          .glow-button::after {
            content: "";
            position: absolute;
            top: -10%;
            left: -100%;
            width: 300%;
            height: 200%;
            background: linear-gradient(120deg, rgba(255, 255, 255, 0.2) 30%, transparent 70%);
            transform: skewX(-20deg);
            transition: all 0.6s ease-in-out;
          }

          .glow-button:hover::after {
            left: 100%;
          }

          .glow-button:hover {
            background-color: #3399FF;
            box-shadow: 0px 0px 30px rgba(51, 153, 255, 0.8);
            transform: translateY(-3px) scale(1.05);
          }

          .glow-button:active {
            transform: scale(0.95);
          }

          .glow-button.outline {
            background-color: #FF6600;
            box-shadow: 0px 0px 20px rgba(255, 102, 0, 0.6);
          }

          .glow-button.outline::after {
            content: "";
            position: absolute;
            top: -10%;
            left: -100%;
            width: 300%;
            height: 200%;
            background: linear-gradient(120deg, rgba(255, 255, 255, 0.2) 30%, transparent 70%);
            transform: skewX(-20deg);
            transition: all 0.6s ease-in-out;
          }

          .glow-button.outline:hover::after {
            left: 100%;
          }

          .glow-button.outline:hover {
            background-color: #e65c00;
            box-shadow: 0px 0px 30px rgba(230, 92, 0, 0.8);
            transform: translateY(-3px) scale(1.05);
          }

          .glow-button.outline:active {
            transform: scale(0.95);
          }
        `}
      </style>
    </section>
  );
}