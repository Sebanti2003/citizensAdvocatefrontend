/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function WomenChildDashboard() {
  const serviceData = {
    101: "Delhi Women's Commission",
    202: "Mumbai Women's Support Center",
    303: "Bangalore Women's Helpline",
    404: "Chennai Protection Services",
    505: "Kolkata Women's Welfare Unit",
    606: "Hyderabad Support Services",
    707: "Pune Women's Aid Center",
    808: "Jaipur Women's Assistance",
    909: "Lucknow Support Network",
  };

  const complaintCategories = [
    "Domestic Violence & Abuse Complaints",
    "Child Labor & Exploitation",
    "Sexual Harassment & Workplace Safety",
    "Maternity & Childcare Facilities Issues",
    "Child Adoption & Foster Care Issues",
    "Women's Education & Employment Complaints",
    "Dowry & Forced Marriage Cases",
    "Cyber Harassment & Online Safety",
    "Malnutrition & Welfare Program Complaints",
    "Women's Shelter & Rehabilitation Complaints",
  ];

  // Only ongoing complaints
  const previousComplaints = [
    {
      id: 1,
      issuecode: "101",
      issuetype: "Delhi Women's Commission",
      category: "Domestic Violence & Abuse Complaints",
      date: "2026-04-12",
      description:
        "Need urgent shelter and legal assistance regarding domestic violence case.",
      status: "Pending",
    },
    {
      id: 2,
      issuecode: "303",
      issuetype: "Bangalore Women's Helpline",
      category: "Women's Education & Employment Complaints",
      date: "2026-04-22",
      description:
        "Scholarship support application is delayed for several months.",
      status: "Pending",
    },
    {
      id: 3,
      issuecode: "808",
      issuetype: "Jaipur Women's Assistance",
      category: "Cyber Harassment & Online Safety",
      date: "2026-04-28",
      description:
        "Repeated online harassment complaints are not being addressed properly.",
      status: "Under Review",
    },
  ];

  const [complaint, setComplaint] = useState({
    issuecode: "",
    issuetype: "",
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

    if (name === "issuecode") {
      const issuetype = serviceData[value] || "";

      setComplaint({
        ...complaint,
        issuecode: value,
        issuetype,
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
      issuecode: oldComplaint.issuecode,
      issuetype: oldComplaint.issuetype,
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
      await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofWomenandChildrenDevelopmentpostcomplaint",
        {
          issuecode: complaint.issuecode,
          issuetype: complaint.issuetype,
          category: complaint.category,
          date: complaint.date,
          description: complaint.description,
          document: "img",
        },
        {
          withCredentials: true,
        }
      );

      setSuccessMessage("✅ Complaint Submitted Successfully!");

      setComplaint({
        issuecode: "",
        issuetype: "",
        category: "",
        date: "",
        description: "",
        idProof: null,
        supportingDocuments: null,
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);

      setErrorMessage("❌ Error submitting complaint. Please try again.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background Design */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-500 transform -skew-y-6"></div>

      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4">
        <motion.h1
          className="text-2xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Women and Child Development Dashboard
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
            {/* Issue Code & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Issue Code
                </label>

                <input
                  type="text"
                  name="issuecode"
                  value={complaint.issuecode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Issue Code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Issue Type
                </label>

                <input
                  type="text"
                  name="issuetype"
                  value={complaint.issuetype}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Issue Type"
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
                Description
              </label>

              <textarea
                name="description"
                value={complaint.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Enter Complaint Details"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
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
                    <h3 className="text-lg font-semibold text-pink-700">
                      {item.issuetype}
                    </h3>

                    <p className="text-sm text-gray-600">
                      Issue Code: {item.issuecode}
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
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
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

export default WomenChildDashboard;
