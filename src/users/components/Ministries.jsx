import React from "react";
import { useNavigate } from "react-router-dom";

const MinistryCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-64 bg-white bg-opacity-70 backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl cursor-pointer p-8"
      onClick={() => navigate(link)}
    >
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const ministries = [
  {
    id: 1,
    title: "🚆 Railways",
    description: "File complaints about train delays, track refund status, report security concerns, and address passenger amenity issues in Indian Railways.",
    link: "/categories/railways"
  },
  {
    id: 2,
    title: "🏥 Health & Family Welfare",
    description: "Report medical negligence, access healthcare facilities, register complaints about medicine quality, and address vaccination-related concerns.",
    link: "/categories/health"
  },
  {
    id: 3,
    title: "🚗 Road Transport",
    description: "Submit complaints about road conditions, report traffic violations, address vehicle registration issues, and highlight public transport problems.",
    link: "/categories/transport"
  },
  {
    id: 4,
    title: "🎓 Education",
    description: "Register grievances about educational institutions, report scholarship delays, address admission issues, and file complaints against unfair practices.",
    link: "/categories/education"
  },
  {
    id: 5,
    title: "🛍️ Consumer Affairs",
    description: "Report fraudulent online sellers, file complaints about defective products, address price manipulation, and highlight unfair trade practices.",
    link: "/categories/consumer"
  },
  {
    id: 6,
    title: "👩‍👧 Women & Child Development",
    description: "Report cases of harassment, register complaints about child labor, address domestic violence issues, and seek support for women's safety.",
    link: "/categories/women-child"
  }
];

const Ministries = () => {
  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 102, 204, 0.2), #FFFFFF)",
        }}
      />

      {/* Additional gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 102, 204, 0.2) 40%, rgba(0, 102, 204, 0.15), #FFFFFF)",
          opacity: 0.95,
        }}
      />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#003366 1px, transparent 1px),
            linear-gradient(90deg, #003366 1px, transparent 1px)
          `,
          backgroundSize: "70px 40px",
          backgroundPosition: "0 0, 0 0",
          opacity: 0.1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-center text-blue-900 mb-16">
          Ministries & Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {ministries.map((ministry) => (
            <MinistryCard
              key={ministry.id}
              title={ministry.title}
              description={ministry.description}
              link={ministry.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ministries;