import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MinistryCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative w-full bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer"
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
      onClick={() => navigate(link)}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-blue-600 text-white rounded-lg rotateY-180">
        <p className="text-lg">Click to Explore</p>
      </div>
    </motion.div>
  );
};

export default MinistryCard;
