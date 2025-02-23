import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    id: 1,
    title: "📊 Data-Driven Decision Making",
    description: "Ministries can analyze real-time trends to take action on urgent complaints.",
  },
  {
    id: 2,
    title: "🚀 Improved Efficiency",
    description: "Automated complaint tracking reduces manual workload and increases responsiveness.",
  },
  {
    id: 3,
    title: "🔔 Automated Alerts",
    description: "Ministries receive reminders for unresolved complaints, ensuring timely resolutions.",
  },
  {
    id: 4,
    title: "🌍 Enhanced Public Trust",
    description: "Transparency and accountability in governance build citizen trust and satisfaction.",
  },
  {
    id: 5,
    title: "⚖️ Policy Improvement",
    description: "Ministries can use complaint data to shape better policies and regulations.",
  },
];

const GovernmentBenefits = () => {
  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF, rgba(34, 197, 94, 0.2))",
        }}
      />

      {/* Additional gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF, rgba(34, 197, 94, 0.25) 60%, rgba(34, 197, 94, 0.3))",
          opacity: 0.95,
        }}
      />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#166534 1px, transparent 1px),
            linear-gradient(90deg, #166534 1px, transparent 1px)
          `,
          backgroundSize: "70px 40px",
          backgroundPosition: "0 0, 0 0",
          opacity: 0.1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.h2 
          className="text-5xl font-bold text-center text-green-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Government Benefits
        </motion.h2>
        <motion.p 
          className="text-center text-xl text-green-800 mb-16 max-w-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ministries gain efficiency, transparency, and better public trust.
        </motion.p>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="bg-white bg-opacity-70 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-green-800 mb-4">{benefit.title}</h3>
              <p className="text-lg text-green-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentBenefits;