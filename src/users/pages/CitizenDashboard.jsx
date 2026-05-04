import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaTrain,
  FaRoad,
  FaHospital,
  FaFemale,
  FaShoppingCart,
  FaGraduationCap,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CitizenDashboard() {
  const navigate = useNavigate();

  const [selectedMinistry, setSelectedMinistry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const ministries = [
    "All",
    "Railways",
    "Road Transport",
    "Consumer Affairs",
    "Health & Family Welfare",
    "Women & Child Development",
    "Education",
  ];

  // Hardcoded complaints for UI preview
  const complaints = [
    {
      id: 1,
      ministry: "Railways",
      title: "Dirty Train Washrooms",
      status: "Submitted",
      date: "2026-05-01",
      description:
        "Washrooms were not cleaned properly during the journey.",
    },
    {
      id: 2,
      ministry: "Road Transport",
      title: "Potholes on Highway",
      status: "Pending",
      date: "2026-05-02",
      description:
        "Large potholes causing traffic congestion and accidents.",
    },
    {
      id: 3,
      ministry: "Consumer Affairs",
      title: "Fake Product Delivered",
      status: "Resolved",
      date: "2026-05-03",
      description:
        "Received counterfeit product from online shopping platform.",
    },
    {
      id: 4,
      ministry: "Health & Family Welfare",
      title: "Hospital Overcharging",
      status: "Under Review",
      date: "2026-05-03",
      description:
        "Private hospital charged extra fees without explanation.",
    },
    {
      id: 5,
      ministry: "Women & Child Development",
      title: "Cyber Harassment Complaint",
      status: "Pending",
      date: "2026-05-04",
      description:
        "Receiving repeated abusive messages on social media.",
    },
    {
      id: 6,
      ministry: "Education",
      title: "Scholarship Delay",
      status: "Resolved",
      date: "2026-05-04",
      description:
        "Scholarship amount has not been credited for months.",
    },
  ];

  const filteredComplaints = complaints.filter((complaint) => {
    const ministryMatch =
      selectedMinistry === "All" ||
      complaint.ministry === selectedMinistry;

    const statusMatch =
      selectedStatus === "All" ||
      complaint.status === selectedStatus;

    return ministryMatch && statusMatch;
  });

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:3000/api/v1/user/auth/logout",
        {
          withCredentials: true,
        }
      );

      navigate("/user/login");
    } catch (error) {
      console.log(error);
    }
  };

  const ministryIcons = {
    Railways: <FaTrain />,
    "Road Transport": <FaRoad />,
    "Consumer Affairs": <FaShoppingCart />,
    "Health & Family Welfare": <FaHospital />,
    "Women & Child Development": <FaFemale />,
    Education: <FaGraduationCap />,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700 border border-green-300";

      case "Under Review":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";

      case "Pending":
        return "bg-red-100 text-red-700 border border-red-300";

      default:
        return "bg-blue-100 text-blue-700 border border-blue-300";
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-80 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white shadow-2xl flex flex-col justify-between">
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center mt-10">
            <div className="bg-white/10 p-4 rounded-full shadow-lg">
              <FaUserCircle className="text-8xl text-blue-300" />
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Samiksha Bharti
            </h2>

            <p className="text-gray-300 text-sm mt-1">
              Registered Citizen
            </p>
          </div>

          {/* Post Complaint Button */}
          <div className="px-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/SelectCategory")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-2xl font-bold shadow-lg transition"
            >
              + Post Complaint
            </motion.button>
          </div>

          {/* Sidebar Menu */}
          <div className="mt-10 px-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 px-2">
              Ministries
            </h3>

            <div className="space-y-3">
              {ministries.map((ministry, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMinistry(ministry)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    selectedMinistry === ministry
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="text-xl">
                    {ministryIcons[ministry] || (
                      <FaClipboardList />
                    )}
                  </div>

                  <span className="font-medium text-sm">
                    {ministry}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-bold shadow-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Top Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-800">
                Citizen Dashboard
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Track, monitor and manage all your complaints
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-100 border border-blue-200 rounded-2xl p-4 text-center shadow">
                <h2 className="text-3xl font-bold text-blue-600">
                  {
                    complaints.filter(
                      (c) => c.status === "Submitted"
                    ).length
                  }
                </h2>

                <p className="text-sm font-medium text-gray-700 mt-1">
                  Submitted
                </p>
              </div>

              <div className="bg-red-100 border border-red-200 rounded-2xl p-4 text-center shadow">
                <h2 className="text-3xl font-bold text-red-600">
                  {
                    complaints.filter(
                      (c) => c.status === "Pending"
                    ).length
                  }
                </h2>

                <p className="text-sm font-medium text-gray-700 mt-1">
                  Pending
                </p>
              </div>

              <div className="bg-yellow-100 border border-yellow-200 rounded-2xl p-4 text-center shadow">
                <h2 className="text-3xl font-bold text-yellow-600">
                  {
                    complaints.filter(
                      (c) => c.status === "Under Review"
                    ).length
                  }
                </h2>

                <p className="text-sm font-medium text-gray-700 mt-1">
                  Under Review
                </p>
              </div>

              <div className="bg-green-100 border border-green-200 rounded-2xl p-4 text-center shadow">
                <h2 className="text-3xl font-bold text-green-600">
                  {
                    complaints.filter(
                      (c) => c.status === "Resolved"
                    ).length
                  }
                </h2>

                <p className="text-sm font-medium text-gray-700 mt-1">
                  Resolved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-4 mt-8">
          {[
            "All",
            "Submitted",
            "Pending",
            "Under Review",
            "Resolved",
          ].map((status, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-3 rounded-2xl font-semibold shadow-md transition ${
                selectedStatus === status
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>

        {/* Complaint Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          {filteredComplaints.map((complaint) => (
            <motion.div
              key={complaint.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Top Bar */}
              <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>

              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {complaint.title}
                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                      <span className="text-blue-600">
                        {ministryIcons[complaint.ministry]}
                      </span>

                      <span className="font-medium">
                        {complaint.ministry}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mt-2">
                      Filed on: {complaint.date}
                    </p>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-bold ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                  <p className="text-gray-700 leading-relaxed">
                    {complaint.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Complaint ID: #{complaint.id}
                  </div>

                  <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-medium transition">
                    Track Status
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredComplaints.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center mt-8">
            <h2 className="text-3xl font-bold text-gray-700">
              No Complaints Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing ministry or status filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CitizenDashboard;