import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function EducationDashboard() {
  const institutionData = {
    101: "Delhi University",
    202: "IIT Bombay",
    303: "JNU Delhi",
    404: "Bangalore University",
    505: "Anna University",
    606: "University of Mumbai",
    707: "IIT Madras",
    808: "Jadavpur University",
    909: "Aligarh Muslim University",
  };

  const categories = [
    "Admission Issues",
    "Exam & Result Issues",
    "Scholarship & Financial Aid",
    "Infrastructure & Facilities (Classrooms, Labs, Hostels)",
    "Faculty & Teaching Quality",
    "Harassment & Ragging Complaints",
    "Library & Resource Management",
    "Online Learning & Digital Access",
    "Student Grievance & Disciplinary Issues",
    "Transport & Commute Facilities",
    "Delay in Degree/Certificate Issuance",
  ];

  // Only ongoing complaints
  const previousComplaints = [
    {
      id: 1,
      institutionid: "101",
      institutionname: "Delhi University",
      category: "Exam & Result Issues",
      date: "2026-04-10",
      description:
        "Semester results are delayed for more than two months.",
      status: "Pending",
    },
    {
      id: 2,
      institutionid: "808",
      institutionname: "Jadavpur University",
      category: "Scholarship & Financial Aid",
      date: "2026-04-22",
      description:
        "Scholarship amount has not been credited to students yet.",
      status: "Pending",
    },
    {
      id: 3,
      institutionid: "404",
      institutionname: "Bangalore University",
      category: "Infrastructure & Facilities (Classrooms, Labs, Hostels)",
      date: "2026-04-28",
      description:
        "Classroom projectors and lab computers are not functioning properly.",
      status: "Under Review",
    },
  ];

  const [complaint, setComplaint] = useState({
    institutionid: "",
    institutionname: "",
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

    if (name === "institutionid") {
      const institutionname = institutionData[value] || "";

      setComplaint({
        ...complaint,
        institutionid: value,
        institutionname,
      });
    } else {
      setComplaint({
        ...complaint,
        [name]: value,
      });
    }
  };

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
      institutionid: oldComplaint.institutionid,
      institutionname: oldComplaint.institutionname,
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
        "http://localhost:3000/api/v1/complaints/ministryofeducationpostcomplaint",
        {
          institutionid: complaint.institutionid,
          institutionname: complaint.institutionname,
          category: complaint.category,
          date: complaint.date,
          description: complaint.description,
          document: "img",
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (data) {
        setSuccessMessage("✅ Complaint Submitted Successfully!");

        setComplaint({
          institutionid: "",
          institutionname: "",
          category: "",
          date: "",
          description: "",
          idProof: null,
          supportingDocuments: null,
        });
      } else {
        setErrorMessage("❌ Failed to submit complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);

      setErrorMessage("❌ Failed to submit complaint. Please try again.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background Design */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>

      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4">
        <motion.h1
          className="text-2xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Ministry of Education Dashboard
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
            {/* Institution ID & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Institution ID
                </label>

                <input
                  type="text"
                  name="institutionid"
                  value={complaint.institutionid}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Institution ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Institution Name
                </label>

                <input
                  type="text"
                  name="institutionname"
                  value={complaint.institutionname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Enter Institution Name"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category
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
                Description
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
                    <h3 className="text-lg font-semibold text-indigo-700">
                      {item.institutionname}
                    </h3>

                    <p className="text-sm text-gray-600">
                      Institution ID: {item.institutionid}
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

export default EducationDashboard;
