import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section
      className="w-full h-screen flex flex-col items-center justify-center px-16 py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(255, 153, 51, 0.1), #FFFFFF)",
      }}
    >
      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 153, 51, 0.6), rgba(255, 153, 51, 0.3),rgba(255, 153, 51, 0.1) 30%, #FFFFFF)",
          opacity: 0.95,
        }}
      ></div>

      {/* Grid lines overlay - with top line removed */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#003366 1px, transparent 1px),
            linear-gradient(90deg, #003366 1px, transparent 1px)
          `,
          backgroundSize: "70px 40px",
          backgroundPosition: "0 40px, 0 0",
          opacity: 0.1,
        }}
      ></div>

      {/* Title */}
      <motion.h2
        className="text-[5vw] font-extrabold leading-tight uppercase relative z-10 font-['Oswald'] glossy-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>

      {/* Steps Section */}
      <div className="w-full max-w-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-18 relative z-10">
        {[
          {
            title: "Step 1: Login",
            description:
              "Users log in and select their state to route complaints to the respective government.",
          },
          {
            title: "Step 2: File a Complaint",
            description:
              "Select a category, provide complaint details, and submit proof (if required).",
          },
          {
            title: "Step 3: Track Progress",
            description:
              "Check complaint status updates directly from the ministry dashboard.",
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="glossy-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 + index * 0.2 }}
          >
            <h3 className="text-[2.5vw] font-bold uppercase step-title">{step.title}</h3>
            <p className="mt-4 text-[1.5vw] step-description">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <style>
        {`
          .glossy-title {
            background: linear-gradient(45deg, #ff6600, #ff8533);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 
              2px 2px 4px rgba(255, 102, 0, 0.3),
              -2px -2px 4px rgba(255, 255, 255, 0.3);
            position: relative;
            animation: titleFloat 3s ease-in-out infinite;
          }

          @keyframes titleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .glossy-card {
            position: relative;
            padding: 2rem;
            border-radius: 1.5rem;
            background: radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(220, 247, 220, 0.9) 50%,
              rgba(185, 255, 185, 0.85) 100%
            );
            backdrop-filter: blur(10px);
            box-shadow: 
              0 10px 20px rgba(0, 0, 0, 0.1),
              0 6px 6px rgba(0, 0, 0, 0.1),
              inset 0 -5px 10px rgba(185, 255, 185, 0.5),
              inset 0 5px 10px rgba(255, 255, 255, 0.8);
            overflow: hidden;
            transition: all 0.4s ease-in-out;
          }

          .glossy-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent,
              rgba(255, 255, 255, 0.8),
              transparent
            );
            transform: rotate(45deg);
            animation: shimmer 3s infinite;
            pointer-events: none;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }

          .glossy-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 
              0 15px 30px rgba(0, 0, 0, 0.15),
              0 10px 10px rgba(0, 0, 0, 0.1),
              inset 0 -5px 10px rgba(185, 255, 185, 0.7),
              inset 0 5px 10px rgba(255, 255, 255, 0.9);
          }

          .step-title {
            background: linear-gradient(135deg, #2e8b57, #3cb371);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 
              2px 2px 4px rgba(46, 139, 87, 0.3),
              -1px -1px 2px rgba(255, 255, 255, 0.5);
            position: relative;
            transition: all 0.3s ease;
          }

          .step-description {
            color: #1a1a1a;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
            position: relative;
            z-index: 1;
            transition: all 0.3s ease;
          }

          .glossy-card:hover .step-title {
            transform: scale(1.05);
            text-shadow: 
              3px 3px 6px rgba(46, 139, 87, 0.4),
              -2px -2px 4px rgba(255, 255, 255, 0.6);
          }

          .glossy-card:hover .step-description {
            color: #000000;
            text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6);
          }
        `}
      </style>
    </section>
  );
};

export default HowItWorks;