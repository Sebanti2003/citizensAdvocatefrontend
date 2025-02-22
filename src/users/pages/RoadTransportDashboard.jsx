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

  const sampleComplaints = {
    101: [
      { description: "Bus did not arrive on time.", status: "Pending" },
      { description: "Driver was rude to passengers.", status: "Resolved" },
    ],
    202: [
      { description: "Escalator was not working.", status: "Pending" },
      { description: "Ticket machine was out of order.", status: "Resolved" },
    ],
    303: [
      { description: "Overcrowding in peak hours.", status: "Pending" },
      { description: "Broken seats in the bus.", status: "Resolved" },
    ],
  };

  const [complaint, setComplaint] = useState({
    ministry: "67b0a135a3336b7a78621913", // Fixed static ministry ID
    transportservicenumber: "",
    transportservicename: "",
    category: "",
    date: "",
    description: "",
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "transportservicenumber") {
      const transportservicename = transportData[value] || "";
      setComplaint({ ...complaint, transportservicenumber: value, transportservicename });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/complaints//ministryofroadtransportandhighwayspostcomplaint",
        {
          ...complaint,
          document: "picimg",
        }, {
        withCredentials: true
      }
      );
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      setSuccessMessage("✅ Complaint Submitted Successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <motion.h1 className="text-4xl font-extrabold text-blue-800 text-center mt-6">
        Ministry of Road Transport Dashboard
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

        <h2 className="text-xl font-bold text-gray-800">File a New Complaint</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium">Transport Service Number</label>
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
            <label className="block text-lg font-medium">Transport Service Name</label>
            <input
              type="text"
              name="transportservicename"
              value={complaint.transportservicename}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
        </div>

        {filteredComplaints.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-bold mb-4">Existing Complaints for {complaint.transportservicename}</h3>
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

export default RoadTransportDashboard;
