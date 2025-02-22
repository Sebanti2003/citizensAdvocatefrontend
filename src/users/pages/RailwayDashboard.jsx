import { useState } from "react";
import { motion } from "framer-motion";

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
    "Station Facilities (Washrooms, Waiting Rooms, Accessibility)",
    "Unauthorized Vendors & Hawkers",
    "Overcrowding & Passenger Safety",
    "Lost & Found Services",
    "AC & Fan Malfunctioning",
    "TTE & Railway Staff Misconduct"
  ];

  const sampleComplaints = {
    111: [
      { description: "Train was late by 3 hours.", status: "Pending" },
      { description: "Seats were not cleaned properly.", status: "Resolved" },
    ],
    222: [
      { description: "Food quality was terrible.", status: "Pending" },
      { description: "AC was not working in my coach.", status: "Resolved" },
    ],
    333: [
      { description: "Washroom had no water supply.", status: "Pending" },
      { description: "No blankets provided in AC coach.", status: "Resolved" },
    ],
  };

  const [complaint, setComplaint] = useState({
    trainNumber: "",
    trainName: "",
    pnr: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "trainNumber") {
      const trainName = trainData[value] || "";
      setComplaint({ ...complaint, trainNumber: value, trainName });

      if (sampleComplaints[value]) {
        setFilteredComplaints(sampleComplaints[value]);
      } else {
        setFilteredComplaints([]);
      }
    } else {
      setComplaint({ ...complaint, [name]: value });
    }
  };

  const handleRepostComplaint = (desc) => {
    setComplaint((prev) => ({
      ...prev,
      description: desc,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("✅ Complaint Submitted Successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <motion.h1 className="text-4xl font-extrabold text-blue-800 text-center mt-6">
        Ministry of Railways Dashboard
      </motion.h1>

      <motion.div
        className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg mt-6 flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Message */}
        {successMessage && (
          <motion.div
            className="w-full text-center text-lg font-semibold text-green-700 bg-green-100 py-2 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {successMessage}
          </motion.div>
        )}

        {/* Complaint Form */}
        <h2 className="text-xl font-bold text-gray-800">File a New Complaint</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium">Train Number</label>
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
            <label className="block text-lg font-medium">Train Name</label>
            <input
              type="text"
              name="trainName"
              value={complaint.trainName}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Display Existing Complaints for Selected Train */}
        {filteredComplaints.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-bold mb-4">Existing Complaints for {complaint.trainName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComplaints.map((comp, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-semibold">{comp.description}</p>
                  <p className={`text-sm ${comp.status === "Resolved" ? "text-green-600" : "text-red-600"}`}>
                    Status: {comp.status}
                  </p>
                  <button
                    onClick={() => handleRepostComplaint(comp.description)}
                    className="mt-2 py-1 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Repost the Same Complaint
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Complaint Category Selection */}
        <div className="mt-4">
          <label className="block text-lg font-medium">Select Complaint Category</label>
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

        {/* Choose Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-lg font-medium">Choose Date</label>
            <input
              type="date"
              name="date"
              value={complaint.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Complaint Description */}
        <div className="mt-6">
          <label className="block text-lg font-medium">Complaint Description</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Describe your complaint"
            rows="3"
          />
        </div>

        {/* Upload Document */}
        <div className="mt-4">
          <label className="block text-lg font-medium">Upload Supporting Document</label>
          <input type="file" className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        {/* Submit Complaint */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </motion.div>
    </div>
  );
}

export default RailwaysDashboard;