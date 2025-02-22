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
    "Station Facilities (Washrooms, Waiting Rooms, Accessibility)",
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

    if (name === "trainNumber") {
      setComplaint({
        ...complaint,
        trainNumber: value,
        trainName: trainData[value] || complaint.trainName
      });
    } else {
      setComplaint({ ...complaint, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setComplaint({ ...complaint, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ministry", "67b0a0b2a3336b7a7862190b");
    formData.append("trainNumber", complaint.trainNumber);
    formData.append("trainName", complaint.trainName);
    formData.append("pnr", complaint.pnr);
    formData.append("date", complaint.date);
    formData.append("description", complaint.description);
    formData.append("category", complaint.category);
    if (complaint.document) {
      formData.append("document", complaint.document);
    }

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
          document: "picimg"
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);
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
        setErrorMessage(data.message || "❌ Failed to submit complaint.");
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

        {errorMessage && (
          <motion.div
            className="w-full text-center text-lg font-semibold text-red-700 bg-red-100 py-2 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>
        )}

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
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter Train Name"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-lg font-medium">PNR Number</label>
          <input
            type="text"
            name="pnr"
            value={complaint.pnr}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter PNR Number"
          />
        </div>

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

        <div className="mt-4">
          <label className="block text-lg font-medium">Choose Date</label>
          <input
            type="date"
            name="date"
            value={complaint.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

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

        <div className="mt-4">
          <label className="block text-lg font-medium">Upload Supporting Document</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

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
