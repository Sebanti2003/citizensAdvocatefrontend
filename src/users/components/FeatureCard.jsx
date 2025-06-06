import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="min-w-[300px] bg-white shadow-lg p-50 rounded-lg flex-shrink-0 text-center">
      <h3 className="text-4xl font-semibold">{title}</h3>
      <p className="text-gray-600 text-2xl mt-2">{description}</p>
    </div>
  );
};

export default FeatureCard;
