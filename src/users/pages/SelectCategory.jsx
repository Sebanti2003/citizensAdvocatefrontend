import { useNavigate } from "react-router-dom";
import educationImage from "@/assets/education.png";
import railwaysImage from "@/assets/Railways.svg";
import roadTransportImage from "@/assets/road_transport.png";
import consumerAffairsImage from "@/assets/consumer_affairs.png";
import healthFamilyImage from "@/assets/healthy_family.svg";
import womenChildImage from "@/assets/women_child.svg";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import axios from "axios";

function SelectCategory() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = React.useState('');

  const handlelogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/auth/logout', {
        withCredentials: true
      });
      console.log(response.data);
      navigate('/user/login');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/me', {
          withCredentials: true
        });
        console.log(response.data);
        setName(response.data.user.name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const categories = [
    { image: educationImage, link: "/EducationDashboard" },
    { image: railwaysImage, link: "/RailwayDashboard" },
    { image: roadTransportImage, link: "/RoadTransportDashboard" },
    { image: consumerAffairsImage, link: "/ConsumerAffairsDashboard", larger: true },
    { image: healthFamilyImage, link: "/HealthFamilyDashboard" },
    { image: womenChildImage, link: "/WomenChildDashboard" }
  ];

  return (
    <div className="flex flex-col items-center justify-between h-screen overflow-hidden relative pb-16">
      {/* Background with Indian flag colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6 z-0"></div>
      <div className="absolute inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] z-0"></div>

      {/* Title */}
      <div className="flex font-bold text-gray-800 fancy-font justify-end items-center gap-5 w-full text-2xl z-10 pr-10 mt-5 pt-2">
        <div className="cursor-pointer hover:text-green-700 transition" onClick={() => navigate('/user/citizendashboard')}>Profile</div>
        <div onClick={handlelogout}>
          <motion.button
            whileHover={{ scale: 1.15, backgroundColor: "#86efac" }}
            transition={{ duration: 0.3 }}
            className="text-lg font-extrabold text-orange-700 mx-3 bg-white py-2 px-5 rounded-xl shadow-lg"
          >
            LOGOUT
          </motion.button>
        </div>
      </div>

      <h1 className="text-6xl font-extrabold text-gray-800 fancy-font mb-1 tracking-wide z-10">GOVERNMENT OF INDIA</h1>

      {/* Subtitle */}
      <h2 className="text-4xl font-bold text-gray-800 fancy-font tracking-tight mb-3 z-10">
        SELECT MINISTRY
      </h2>

      {/* Category Blocks with increased width only */}
      <div className="grid grid-cols-3 gap-8 w-full px-8 justify-items-center z-10 h-[48vh] mb-20">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center ${category.larger ? 'w-80 h-48' : 'w-72 h-48'} cursor-pointer rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg`}
            onClick={() => navigate(category.link)}
            whileHover={{ scale: 1.1 }}
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');
        .fancy-font {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default SelectCategory;