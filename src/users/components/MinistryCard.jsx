import React from "react";
import Link from "next/link";

const MinistryCard = ({ title, description, link }) => {
  return (
    <Link href={link}>
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 h-full">
        <h3 className="text-3xl font-semibold mb-4">{title}</h3>
        <p className="text-xl text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default MinistryCard;