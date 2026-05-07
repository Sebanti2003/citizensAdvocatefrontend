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

  // Ongoing Complaints
  const previousComplaints = [
    {
      id: 1,
      hospitalid: "111",
      hospitalname: "AIIMS Delhi",
      category: "Hospital & Clinic Negligence",
      date: "2026-04-10",
      description:
        "Doctors were unavailable during emergency hours and patient had to wait for a long time.",
      status: "Pending",
    },
    {
      id: 2,
      hospitalid: "333",
      hospitalname: "Fortis Hospital Mumbai",
      category: "Sanitation & Hygiene in Public Hospitals",
      date: "2026-04-21",
      description:
        "Washrooms and patient wards were not maintained properly.",
      status: "Under Review",
    },
    {
      id: 3,
      hospitalid: "777",
      hospitalname: "Manipal Hospitals Hyderabad",
      category: "Medical Test & Lab Report Delays",
      date: "2026-04-25",
      description:
        "MRI reports were delayed for more than 5 days.",
      status: "Pending",
    },
  ];

  const [complaint, setComplaint] = useState({
    ministry: "67b0a143a3336b7a78621915",
    hospitalid: "",
    hospitalname: "",
    category: "",
    date: "",
    description: "",
    idProof: null,
    supportingDocuments: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "hospitalid") {
      const hospitalname = hospitalData[value] || "";

      setComplaint({
        ...complaint,
        hospitalid: value,
        hospitalname,
      });
    } else {
      setComplaint({
        ...complaint,
        [name]: value,
      });
    }
  };

  // File Upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setComplaint({
      ...complaint,
      [name]: files[0],
    });
  };

  // Repost Complaint
  const handleRepostComplaint = (oldComplaint) => {
    setComplaint({
      ...complaint,
      hospitalid: oldComplaint.hospitalid,
      hospitalname: oldComplaint.hospitalname,
      category: oldComplaint.category,
      date: "",
      description: oldComplaint.description,
      idProof: null,
      supportingDocuments: null,
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
        "http://localhost:3000/api/v1/complaints/ministryofHealthFamilyWelfarepostcomplaint",
        {
          ...complaint,
          document: "imgtoday.jpg",
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setSuccessMessage("✅ Complaint Submitted Successfully!");

      setComplaint({
        ministry: "67b0a143a3336b7a78621915",
        hospitalid: "",
        hospitalname: "",
        category: "",
        date: "",
        description: "",
        idProof: null,
        supportingDocuments: null,
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "❌ Failed to submit complaint."
      );
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
          Ministry of Health and Family Dashboard
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
            {/* Hospital ID & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hospital ID
                </label>

                <input
                  type="text"
                  name="hospitalid"
                  value={complaint.hospitalid}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Hospital ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Hospital Name
                </label>

                <input
                  type="text"
                  name="hospitalname"
                  value={complaint.hospitalname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Hospital Name"
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

                {categories.map((category, index) => (
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

            {/* ID Proof */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ID Proof
              </label>

              <input
                type="file"
                name="idProof"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Supporting Documents for Grievance */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Supporting Documents for Grievance
              </label>

              <input
                type="file"
                name="supportingDocuments"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />

              {complaint.supportingDocuments && (
                <p className="text-sm text-green-700 mt-1">
                  Selected File: {complaint.supportingDocuments.name}
                </p>
              )}
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
                      {item.hospitalname}
                    </h3>

                    <p className="text-sm text-gray-600">
                      Hospital ID: {item.hospitalid}
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

export default HealthFamilyDashboard;
