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
          background: "linear-gradient(to bottom, rgba(255, 153, 51, 0.5), rgba(255, 153, 51, 0.3),rgba(255, 153, 51, 0.1) 30%, #FFFFFF)",
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
        className="text-[5vw] font-extrabold text-orange-600 leading-tight drop-shadow-md uppercase relative z-10 font-['Oswald']"
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
            hoverBg: "bg-orange-500",
            textColor: "text-gray-800",
          },
          {
            title: "Step 2: File a Complaint",
            description:
              "Select a category, provide complaint details, and submit proof (if required).",
            hoverBg: "bg-white",
            textColor: "text-gray-800"
          },
          {
            title: "Step 3: Track Progress",
            description:
              "Check complaint status updates directly from the ministry dashboard.",
            hoverBg: "bg-green-500",
            textColor: "text-gray-800",
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            className={`p-8 rounded-xl shadow-xl bg-white bg-opacity-70 backdrop-blur-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:${step.hoverBg}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 + index * 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className={`text-[2.5vw] font-bold ${step.textColor} uppercase`}>{step.title}</h3>
            <p className={`mt-4 text-[1.5vw] ${step.textColor}`}>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;