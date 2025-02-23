/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function HealthFamilyDashboard() {
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
    hospitalId: "",
    hospitalName: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitalId") {
      const hospitalName = hospitalData[value] || "";
      setComplaint({ ...complaint, hospitalId: value, hospitalName });
      setFilteredComplaints(sampleComplaints[value] || []);
    } else {
      setComplaint({ ...complaint, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setComplaint({ ...complaint, document: e.target.files[0] });
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleRepostComplaint = (desc) => {
    setComplaint((prev) => ({ ...prev, description: desc }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hospitalid", complaint.hospitalId);
      formData.append("hospitalname", complaint.hospitalName);
      formData.append("category", complaint.category);
      formData.append("date", complaint.date);
      formData.append("description", complaint.description);
      if (complaint.document) {
        formData.append("document", complaint.document);
      }

      await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofHealthFamilyWelfarepostcomplaint",
        formData,
        { withCredentials: true }
      );

      setSuccessMessage("✅ Complaint Submitted Successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSuccessMessage("❌ Failed to submit complaint. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      <h1 className="text-4xl font-extrabold text-blue-800 text-center mt-6">
        Ministry of Health and Family Dashboard
      </h1>

      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg mt-6">
        {successMessage && <div className="text-center text-green-700">{successMessage}</div>}

        <h2 className="text-xl font-bold">File a New Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="hospitalId" placeholder="Hospital ID" onChange={handleInputChange} className="w-full p-2 border" />
          <input type="text" name="hospitalName" value={complaint.hospitalName} readOnly className="w-full p-2 border bg-gray-50" />
          <select name="category" onChange={handleInputChange} className="w-full p-2 border">
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <input type="date" name="date" onChange={handleInputChange} className="w-full p-2 border" />
          <textarea name="description" placeholder="Describe your complaint" onChange={handleInputChange} className="w-full p-2 border"></textarea>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border" />
          {selectedFileName && <p className="text-sm">Selected file: {selectedFileName}</p>}
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}

export default HealthFamilyDashboard;
