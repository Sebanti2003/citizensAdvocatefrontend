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
    <section className="w-full bg-gray-100 py-16">
      <h2 className="text-4xl font-bold text-center text-gray-800">Key Features</h2>
      <div className="overflow-hidden mt-8">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-100%"] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} title={feature.title} description={feature.description} />
          ))}
          {features.map((feature) => (  // Duplicate set for smooth looping
            <FeatureCard key={`dup-${feature.id}`} title={feature.title} description={feature.description} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
