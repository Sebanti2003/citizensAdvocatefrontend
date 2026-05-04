import { useNavigate } from "react-router-dom";
import educationImage from "@/assets/education.png";
import railwaysImage from "@/assets/Railways.svg";
import roadTransportImage from "@/assets/road_transport.png";
import consumerAffairsImage from "@/assets/consumer_affairs.png";
import healthFamilyImage from "@/assets/healthy_family.svg";
import womenChildImage from "@/assets/women_child.svg";
import { motion } from "framer-motion";

function SelectCategory() {
  const navigate = useNavigate();

  const categories = [
    { image: educationImage, link: "/EducationDashboard" },
    { image: railwaysImage, link: "/RailwayDashboard" },
    { image: roadTransportImage, link: "/RoadTransportDashboard" },
    {
      image: consumerAffairsImage,
      link: "/ConsumerAffairsDashboard",
      larger: true,
    },
    { image: healthFamilyImage, link: "/HealthFamilyDashboard" },
    { image: womenChildImage, link: "/WomenChildDashboard" },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-screen overflow-hidden relative pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6 z-0"></div>

      <div className="absolute inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] z-0"></div>

      {/* Title */}
      <div className="mt-10 z-10 text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 fancy-font mb-2 tracking-wide">
          GOVERNMENT OF INDIA
        </h1>

        <h2 className="text-4xl font-bold text-gray-800 fancy-font tracking-tight">
          SELECT MINISTRY
        </h2>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-3 gap-8 w-full px-8 justify-items-center z-10 h-[48vh] mb-20">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center ${
              category.larger ? "w-80 h-48" : "w-72 h-48"
            } cursor-pointer rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg`}
            onClick={() => navigate(category.link)}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.img
              src={category.image}
              alt="Category"
              className="w-full h-full object-contain p-4 bg-transparent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap");

        .fancy-font {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </div>
  );
}

export default SelectCategory;