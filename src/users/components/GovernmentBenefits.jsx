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
    <section className="w-full bg-gray-900 text-white py-16">
      <h2 className="text-4xl font-bold text-center">Government Benefits</h2>
      <p className="text-center text-lg mt-4 text-gray-300">
        Ministries gain efficiency, transparency, and better public trust.
      </p>
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            className="bg-gray-800 rounded-lg p-6 text-center shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-gray-300">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GovernmentBenefits;
