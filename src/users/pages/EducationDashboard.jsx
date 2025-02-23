/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function EducationDashboard() {
  const hospitalData = {
    111: "AIIMS Delhi",
    222: "Apollo Hospitals Chennai",
    333: "Fortis Hospital Mumbai",
    444: "Narayana Health Bangalore",
    555: "CMC Vellore",
    666: "Tata Memorial Hospital",
    777: "Manipal Hospitals Hyderabad",
    888: "Kokilaben Dhirubhai Ambani Hospital",
    999: "Max Super Speciality Hospital",
  };

  const categories = [
    "Hospital & Clinic Negligence",
    "Unavailability of Medicines & Vaccines",
    "Ambulance & Emergency Service Delays",
    "Overcharging by Private Hospitals",
    "Blood Bank & Organ Donation Issues",
    "Health Insurance Claims & Fraud",
    "Mental Health & Counselling Services",
    "Malpractice & Misconduct by Doctors",
    "Sanitation & Hygiene in Public Hospitals",
    "Medical Test & Lab Report Delays",
    "Lack of Facilities for Disabled Patients",
  ];

  const sampleComplaints = {
    111: [
      { description: "Long waiting hours for OPD.", status: "Pending" },
      { description: "Staff behavior was unprofessional.", status: "Resolved" },
    ],
    222: [
      { description: "High medical charges for basic treatments.", status: "Pending" },
      { description: "Cleanliness issues in the wards.", status: "Resolved" },
    ],
    333: [
      { description: "Shortage of essential medicines.", status: "Pending" },
      { description: "Emergency response time was slow.", status: "Resolved" },
    ],
  };

  const [complaint, setComplaint] = useState({
    institutionid: "",
    institutionname: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "institutionid") {
      const institutionname = hospitalData[value] || "";
      setComplaint({ ...complaint, institutionid: value, institutionname });

      setFilteredComplaints(sampleComplaints[value] || []);
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
    try{
      e.preventDefault();

    const response = await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofeducationpostcomplaint",
        {
          institutionid: complaint.institutionid,
          institutionname: complaint.institutionname,
          category: complaint.category,
          date: complaint.date,
          description: complaint.description,
          document: complaint.document || "img",
        },
        {
          withCredentials: true,
        }
      );

      setSuccessMessage("✅ Complaint Submitted Successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
    
     catch (error) {
      console.error("Error submitting complaint:", error);
      setSuccessMessage("❌ Failed to submit complaint. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <motion.h1 className="text-4xl font-extrabold text-blue-800 text-center mt-6">
        Ministry of Education
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
            <label className="block text-lg font-medium">Education ID</label>
            <input
              type="text"
              name="institutionid"
              value={complaint.institutionid}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter Hospital ID"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Institution Name</label>
            <input
              type="text"
              name="institutionname"
              value={complaint.hospitalname}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {filteredComplaints.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-bold mb-4">Existing Complaints for {complaint.institutionname}</h3>
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
          <label className="block text-lg font-medium">Select Category</label>
          <select
            name="category"
            value={complaint.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
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

export default EducationDashboard;
