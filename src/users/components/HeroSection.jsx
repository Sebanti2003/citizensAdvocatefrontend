import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRouteTransitionLoader } from "../../components/RouteTransitionLoader";

const ministryInfo = [
  {
    name: "Ministry of Railways",
    desc: "Handles grievances related to train services, ticketing, cleanliness, safety, and station facilities.",
    law: "Railways Act, 1989 & Indian Railways Code",
  },
  {
    name: "Ministry of Road Transport & Highways",
    desc: "Addresses issues regarding national highways, road safety, vehicle registration, and driving licenses.",
    law: "Motor Vehicles Act, 1988 (amended 2019)",
  },
  {
    name: "Ministry of Consumer Affairs, Food & Public Distribution",
    desc: "Receives complaints on unfair trade practices, defective goods, deficient services, and PDS issues.",
    law: "Consumer Protection Act, 2019",
  },
  {
    name: "Ministry of Health & Family Welfare",
    desc: "Manages grievances on hospitals, medical negligence, drug quality, and public health schemes.",
    law: "Clinical Establishments Act, 2010 & Drugs and Cosmetics Act, 1940",
  },
  {
    name: "Ministry of Women & Child Development",
    desc: "Handles complaints related to women's safety, child protection, harassment, and welfare schemes.",
    law: "POSH Act, 2013 & POCSO Act, 2012",
  },
  {
    name: "Ministry of Education",
    desc: "Addresses issues regarding schools, universities, scholarships, and education quality.",
    law: "Right to Education Act, 2009 & UGC Act, 1956",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const { showRouteLoader } = useRouteTransitionLoader();

  const handleFileComplaint = () => {
    showRouteLoader('/user/login');
    navigate('/user/login');
  };

  useEffect(() => {
    document.body.style.overflow = showInfo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showInfo]);

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
          Citizens&apos;
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
          <button
            onClick={() => setShowInfo(true)}
            className="glow-button outline">
            📖 Learn More
          </button>
        </div>
      </motion.div>

      {/* Learn More Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-600" />

              <div className="flex items-start justify-between px-8 pt-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-3xl font-extrabold text-blue-900 font-['Oswald']">
                    About Citizens&apos; Advocate
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Your constitutional right to be heard.
                  </p>
                </div>
                <button
                  onClick={() => setShowInfo(false)}
                  className="text-gray-400 hover:text-red-500 text-3xl font-bold leading-none transition"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="overflow-y-auto px-8 py-6 space-y-6 text-gray-700">
                <section>
                  <h3 className="text-lg font-bold text-orange-600 mb-2">
                    Your Right to File Complaints
                  </h3>
                  <p className="leading-relaxed text-sm">
                    Under <strong>Article 19(1)(a)</strong> of the Constitution of India,
                    every citizen has the fundamental right to freedom of speech and
                    expression, which includes the right to raise grievances against
                    public authorities. The <strong>Right to Information Act, 2005</strong>{" "}
                    further empowers citizens to seek transparency and accountability
                    from government bodies.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-orange-600 mb-2">
                    Grievance Redressal Framework
                  </h3>
                  <p className="leading-relaxed text-sm">
                    The Government of India operates the{" "}
                    <strong>
                      Centralised Public Grievance Redress and Monitoring System
                      (CPGRAMS)
                    </strong>{" "}
                    to ensure timely resolution. As per the{" "}
                    <strong>Citizens&apos; Charter</strong>, every ministry is obligated
                    to acknowledge complaints within a stipulated time frame and
                    resolve them transparently.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-orange-600 mb-3">
                    Ministries Covered
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ministryInfo.map((m) => (
                      <div
                        key={m.name}
                        className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-orange-50"
                      >
                        <h4 className="font-bold text-blue-900 text-sm">
                          {m.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {m.desc}
                        </p>
                        <p className="text-[11px] text-green-700 mt-2 font-semibold">
                          ⚖ {m.law}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-orange-600 mb-2">
                    How to File Effectively
                  </h3>
                  <ul className="list-disc list-inside text-sm space-y-1 leading-relaxed">
                    <li>Select the correct ministry to avoid delays.</li>
                    <li>Provide accurate facts, dates, and supporting documents.</li>
                    <li>Avoid anonymous, frivolous, or repetitive complaints.</li>
                    <li>Track your complaint status using the unique reference ID.</li>
                  </ul>
                </section>

                <p className="text-[11px] text-gray-400 italic border-t border-gray-100 pt-3">
                  Disclaimer: Information shown here is for general awareness. For
                  binding legal advice, refer to the official statutes and consult
                  qualified professionals.
                </p>
              </div>

              <div className="px-8 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setShowInfo(false)}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
