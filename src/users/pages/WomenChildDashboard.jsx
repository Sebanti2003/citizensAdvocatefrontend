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
    "Women's Shelter & Rehabilitation Complaints"
  ];

  const sampleComplaints = {
    101: [
      { description: "Need immediate assistance with shelter access.", status: "Pending" },
      { description: "Seeking counseling services support.", status: "Resolved" },
    ],
    202: [
      { description: "Request for legal aid services.", status: "Pending" },
      { description: "Follow-up on support program application.", status: "Resolved" },
    ],
    303: [
      { description: "Workplace safety concern report.", status: "Pending" },
      { description: "Education scholarship inquiry.", status: "Resolved" },
    ],
  };

  const [complaint, setComplaint] = useState({
    issuecode: "",
    issuetype: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "issuecode") {
      const issuetype = serviceData[value] || "";
      setComplaint({
        ...complaint,
        issuecode: value,
        issuetype,
      });

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
          document: complaint.document || "img",
        },
        { withCredentials: true }
      );

      setSuccessMessage("✅ Complaint Submitted Successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSuccessMessage("❌ Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background design */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>
      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6">
        <motion.h1
          className="text-4xl font-extrabold text-blue-800 text-center mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Women and Child Development Dashboard
        </motion.h1>

        <h2 className="text-xl font-bold text-gray-800 mt-4">File a New Complaint</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-lg font-medium">Issue Code</label>
            <input
              type="text"
              name="issuecode"
              value={complaint.issuecode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter Service Number"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Issue Type</label>
            <input
              type="text"
              name="issuetype"
              value={complaint.issuetype}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Category</label>
            <select
              name="category"
              value={complaint.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a Category</option>
              {complaintCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={complaint.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={complaint.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter Complaint Details"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Complaint
            </button>
          </div>
        </form>

        {successMessage && (
          <motion.div
            className="mt-4 text-lg font-semibold text-green-700 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.div>
        )}

        <h2 className="text-xl font-bold text-gray-800 mt-6">Previous Complaints</h2>
        <div className="mt-2">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((comp, index) => (
              <div key={index} className="p-3 border border-gray-300 rounded-lg mb-2">
                <p className="text-gray-800">{comp.description}</p>
                <p className={`font-semibold ${comp.status === "Resolved" ? "text-green-600" : "text-red-600"}`}>
                  {comp.status}
                </p>
                <button
                  onClick={() => handleRepostComplaint(comp.description)}
                  className="mt-2 p-2 bg-gray-200 rounded-lg text-sm"
                >
                  Repost
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No previous complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WomenChildDashboard;
