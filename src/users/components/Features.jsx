import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  { id: 1, title: "👁️ View Existing Complaints", description: "See similar complaints before filing to avoid duplication." },
  { id: 2, title: "🔄 Repost Similar Complaints", description: "Easily support complaints related to your issue with one click." },
  { id: 3, title: "🚀 AI-Based Complaint Prioritization", description: "Ensuring high-impact cases are addressed faster." },
  { id: 4, title: "📊 Smart Dashboard", description: "Real-time analytics for ministries to track complaint trends." },
  { id: 5, title: "🔔 Automated Alerts", description: "Ministries receive reminders for unresolved high-demand issues." },
  { id: 6, title: "🌍 Multilingual Support", description: "Ensuring accessibility for all citizens across different languages." },
];

const Features = () => {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF, rgba(0, 102, 204, 0.2))",
        }}
      />

      {/* Additional gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF, rgba(0, 102, 204, 0.15) 60%, rgba(0, 102, 204, 0.2))",
          opacity: 0.95,
        }}
      />

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
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.h2 
          className="text-[4vw] font-extrabold text-blue-900 leading-tight drop-shadow-md uppercase relative z-10 font-['Oswald']"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Key Features
        </motion.h2>

        <div className="overflow-hidden mt-8 w-full">
          <motion.div
            className="flex space-x-6 w-full px-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id} 
                title={feature.title} 
                description={feature.description} 
                className="min-w-[400px] p-6 bg-white bg-opacity-70 backdrop-blur-lg rounded-xl shadow-xl" 
              />
            ))}
            {features.map((feature) => (  // Duplicate set for smooth looping
              <FeatureCard 
                key={`dup-${feature.id}`} 
                title={feature.title} 
                description={feature.description} 
                className="min-w-[400px] p-6 bg-white bg-opacity-70 backdrop-blur-lg rounded-xl shadow-xl" 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;