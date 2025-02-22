import React from "react";
import { motion } from "framer-motion";
import MinistryCard from "./MinistryCard";

const ministries = [
  { id: 1, title: "🚆 Railways", description: "Train delays, refunds, security, etc.", link: "/categories/railways" },
  { id: 2, title: "🏥 Health & Family Welfare", description: "Hospital negligence, ambulance delays.", link: "/categories/health" },
  { id: 3, title: "🚗 Road Transport", description: "Poor roads, rash driving reports.", link: "/categories/transport" },
  { id: 4, title: "🎓 Education", description: "Scholarship issues, ragging complaints.", link: "/categories/education" },
  { id: 5, title: "🛍️ Consumer Affairs", description: "Online scams, fake products.", link: "/categories/consumer" },
  { id: 6, title: "👩‍👧 Women & Child Development", description: "Harassment, child labor.", link: "/categories/women-child" },
];

const Ministries = () => {
  return (
    <section className="w-full bg-gray-100 py-16">
      <h2 className="text-4xl font-bold text-center text-gray-800">Ministries & Categories</h2>
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {ministries.map((ministry) => (
          <MinistryCard key={ministry.id} title={ministry.title} description={ministry.description} link={ministry.link} />
        ))}
      </div>
    </section>
  );
};

export default Ministries;
