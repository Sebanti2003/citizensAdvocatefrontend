// import React from "react";
import { useNavigate } from "react-router-dom";
import educationImage from "@/assets/education.png";
import railwaysImage from "@/assets/railway.png";
import roadTransportImage from "@/assets/road_transport.png";
import consumerAffairsImage from "@/assets/consumer_affairs.png";
import healthFamilyImage from "@/assets/healthy_family.png";
import womenChildImage from "@/assets/women_child.png";
import { motion } from "framer-motion";  

function SelectCategory() {
  const navigate = useNavigate();

  const categories = [
    { image: educationImage, label: "Ministry of Education", link: "/EducationDashboard" },
    { image: railwaysImage, label: "Ministry of Railways", link: "/RailwayDashboard" },
    { image: roadTransportImage, label: "Ministry of Road Transport", link: "/RoadTransportDashboard" },
    { image: consumerAffairsImage, label: "Ministry of Consumer Affairs", link: "/ConsumerAffairsDashboard" },
    { image: healthFamilyImage, label: "Ministry of Health & Family Welfare", link: "/HealthFamilyDashboard" },
    { image: womenChildImage, label: "Ministry of Women & Child Development", link: "/WomenChildDashboard" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FF9933] via-[#138808] to-[#FFFFFF]">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-black mb-4">GOVERNMENT OF WEST BENGAL</h1>

      {/* Subtitle */}
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#138808] to-[#ffffff]">
        Select Category
      </h2>

      {/* Category Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4 justify-items-center mt-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center cursor-pointer p-4 rounded-lg shadow-lg bg-white transition transform hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate(category.link)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={category.image}
              alt={category.label}
              className="w-36 h-36 object-cover rounded-lg mb-4"
            />
            <p className="text-lg font-semibold text-gray-800 text-center">{category.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
