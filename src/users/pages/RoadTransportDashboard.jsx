import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function RoadTransportDashboard() {
  const transportData = {
    101: "Kolkata City Bus Service",
    202: "Mumbai Metro",
    303: "Delhi Public Transport",
    404: "Chennai Local Buses",
    505: "Bangalore BMTC",
    606: "Hyderabad TSRTC",
    707: "Pune PMPML",
    808: "Jaipur City Transport",
    909: "Lucknow Metro",
  };

  const complaintCategories = [
    "Road & Highway Conditions (Potholes, Damage)",
    "Traffic Congestion & Management",
    "Public Transport Service Issues",
    "Auto & Taxi Fare Complaints",
    "Drunk & Rash Driving Reports",
    "Parking Issues & Violations",
    "Accident & Emergency Response Delays",
    "License & Permit Issues",
    "Pollution & Emission Violations",
    "Road Signage & Traffic Light Malfunctions",
    "Corruption & Bribery in Transport Department",
  ];

  // Only ongoing complaints
  const previousComplaints = [
    {
      id: 1,
      transportservicenumber: "101",
      transportservicename: "Kolkata City Bus Service",
      category: "Public Transport Service Issues",
      date: "2026-04-10",
      description:
        "Bus service is extremely delayed during office hours.",
      status: "Pending",
    },
    {
      id: 2,
      transportservicenumber: "505",
      transportservicename: "Bangalore BMTC",
      category: "Road & Highway Conditions (Potholes, Damage)",
      date: "2026-04-22",
      description:
        "Major potholes causing traffic jams and accidents.",
      status: "Pending",
    },
    {
      id: 3,
      transportservicenumber: "303",
      transportservicename: "Delhi Public Transport",
      category: "Traffic Congestion & Management",
      date: "2026-04-28",
      description:
        "Extreme overcrowding and lack of buses during peak office hours.",
      status: "Under Review",
    },
  ];

  const [complaint, setComplaint] = useState({
    ministry: "67b0a135a3336b7a78621913",
    transportservicenumber: "",
    transportservicename: "",
    category: "",
    date: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "transportservicenumber") {
      const transportservicename = transportData[value] || "";

      setComplaint({
        ...complaint,
        transportservicenumber: value,
        transportservicename,
      });
    } else {
      setComplaint({
        ...complaint,
        [name]: value,
      });
    }
  };

  // Repost complaint
  const handleRepostComplaint = (oldComplaint) => {
    setComplaint({
      ...complaint,
      transportservicenumber: oldComplaint.transportservicenumber,
      transportservicename: oldComplaint.transportservicename,
      category: oldComplaint.category,
      date: "",
      description: oldComplaint.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofroadtransportandhighwayspostcomplaint",
        {
          ...complaint,
          document: "picimg",
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setSuccessMessage("✅ Complaint Submitted Successfully!");

      setComplaint({
        ministry: "67b0a135a3336b7a78621913",
        transportservicenumber: "",
        transportservicename: "",
        category: "",
        date: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);

      setErrorMessage("❌ Failed to submit complaint.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>

      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4">
        <motion.h1
          className="text-2xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Ministry of Road Transport Dashboard
        </motion.h1>

        {/* Complaint Form */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {(successMessage || errorMessage) && (
            <motion.div
              className={`mb-3 p-2 rounded-lg text-center ${
                successMessage
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {successMessage || errorMessage}
            </motion.div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            File a New Complaint
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Service Number & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transport Service Number
                </label>

                <input
                  type="text"
                  name="transportservicenumber"
                  value={complaint.transportservicenumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Service Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Transport Service Name
                </label>

                <input
                  type="text"
                  name="transportservicename"
                  value={complaint.transportservicename}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Service Name"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Complaint Category
              </label>

              <select
                name="category"
                value={complaint.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select a category</option>

                {complaintCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={complaint.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Complaint Description
              </label>

              <textarea
                name="description"
                value={complaint.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Describe your complaint"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Submit Complaint
            </button>
          </form>
        </motion.div>

        {/* Ongoing Public Complaints */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ongoing Public Complaints
          </h2>

          <div className="space-y-4">
            {previousComplaints.map((item) => (
              <motion.div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700">
                      {item.transportservicename}
                    </h3>

                    <p className="text-sm text-gray-600">
                      Service Number: {item.transportservicenumber}
                    </p>

                    <p className="text-sm text-gray-600">
                      Category: {item.category}
                    </p>

                    <p className="text-sm text-gray-600">
                      Date: {item.date}
                    </p>

                    <p className="text-sm font-medium mt-1 text-red-600">
                      Status: {item.status}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRepostComplaint(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Repost Complaint
                  </button>
                </div>

                <p className="mt-3 text-gray-700">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RoadTransportDashboard;