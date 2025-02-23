import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function RailwaysDashboard() {
  const trainData = {
    111: "Kolkata-Bangalore Superfast Express",
    222: "Howrah-Puri Rajdhani Express",
    333: "Mumbai-Delhi Duronto Express",
    444: "Chennai-Coimbatore Shatabdi Express",
    555: "Ahmedabad-Jaipur Garib Rath",
    666: "Lucknow-Chandigarh Express",
    777: "Patna-Varanasi Intercity Express",
    888: "Hyderabad-Chennai Charminar Express",
    999: "Delhi-Mumbai Rajdhani Express",
  };

  const complaintCategories = [
    "Train Delay & Rescheduling",
    "Train Cleanliness & Hygiene",
    "Food Quality & Availability",
    "Ticket Booking & Cancellation Issues",
    "Refund & Payment Problems",
    "Coach & Seat Allocation Issues",
    "Security & Theft Complaints",
    "Station Facilities",
    "Unauthorized Vendors & Hawkers",
    "Overcrowding & Passenger Safety",
    "Lost & Found Services",
    "AC & Fan Malfunctioning",
    "TTE & Railway Staff Misconduct",
  ];

  const [complaint, setComplaint] = useState({
    trainNumber: "",
    trainName: "",
    pnr: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For trainNumber, simply update the value without auto-populating trainName
    if (name === "trainNumber") {
      setComplaint({ ...complaint, trainNumber: value });
    } else {
      setComplaint({ ...complaint, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setComplaint({ ...complaint, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofrailwaypostcomplaint",
        {
          trainNumber: complaint.trainNumber,
          trainName: complaint.trainName,
          pnr: complaint.pnr,
          category: complaint.category,
          date: complaint.date,
          description: complaint.description,
          document: "picimg",
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data) {
        setSuccessMessage("✅ Complaint Submitted Successfully!");
        setComplaint({
          trainNumber: "",
          trainName: "",
          pnr: "",
          category: "",
          date: "",
          description: "",
          document: null,
        });
      } else {
        setErrorMessage("❌ Failed to submit complaint.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background design matching Consumer Affairs Dashboard */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>
      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-4">
        <motion.h1 
          className="text-2xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Ministry of Railways Dashboard
        </motion.h1>

        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {(successMessage || errorMessage) && (
            <motion.div
              className={`mb-3 p-2 rounded-lg text-center ${
                successMessage ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {successMessage || errorMessage}
            </motion.div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-3">File a New Complaint</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Train Number</label>
                <input
                  type="text"
                  name="trainNumber"
                  value={complaint.trainNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Train Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Train Name</label>
                <input
                  type="text"
                  name="trainName"
                  value={complaint.trainName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Enter Train Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">PNR Number</label>
              <input
                type="text"
                name="pnr"
                value={complaint.pnr}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter PNR Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
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

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={complaint.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={complaint.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="2"
                placeholder="Describe your complaint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Supporting Document</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Submit Complaint
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default RailwaysDashboard;
