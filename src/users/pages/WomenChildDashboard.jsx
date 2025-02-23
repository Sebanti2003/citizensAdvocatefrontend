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
<<<<<<< HEAD

    if (name === "issuecode") {
      const issuetype = serviceData[value] || "";
      setComplaint({
        ...complaint, issuecode: value, issuetype

      });

      if (sampleComplaints[value]) {
        setFilteredComplaints(sampleComplaints[value]);
      } else {
        setFilteredComplaints([]);
      }
=======
    if (name === "serviceNumber") {
      const serviceName = serviceData[value] || "";
      setComplaint({ ...complaint, serviceNumber: value, serviceName });
      setFilteredComplaints(sampleComplaints[value] || []);
>>>>>>> ab892ce985315050fa1603e86d7521339311db85
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
    const response = await axios.post('http://localhost:3000/api/v1/complaints/ministryofWomenandChildrenDevelopmentpostcomplaint',{
      issuecode: complaint.issuecode,
      issuetype: complaint.issuetype,
      category: complaint.category,
      date: complaint.date,
      description: complaint.description,
      document: complaint.document||"img",
    },{
      withCredentials: true
    });
    setSuccessMessage("✅ Complaint Submitted Successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background design matching Consumer Affairs Dashboard */}
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

<<<<<<< HEAD
        <h2 className="text-xl font-bold text-gray-800">File a New Complaint</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              value={complaint.issuetype

              }
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              
            />
          </div>
        </div>

        {filteredComplaints.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-bold mb-4">Previous Cases for {complaint.issuetype
            }</h3>
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
                    className="mt-2 py-1 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Repost the Same Complaint
                  </button>
                </motion.div>
              ))}
=======
        <motion.div
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 flex flex-col gap-6 mt-6"
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
              <label className="block text-lg font-medium">Support Service Number</label>
              <input
                type="text"
                name="serviceNumber"
                value={complaint.serviceNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Service Number"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Support Service Name</label>
              <input
                type="text"
                name="serviceName"
                value={complaint.serviceName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter Service Name"
              />
>>>>>>> ab892ce985315050fa1603e86d7521339311db85
            </div>
          </div>

          {filteredComplaints.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-bold mb-4">
                Previous Cases for {complaint.serviceName}
              </h3>
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
            <label className="block text-lg font-medium">Select Case Category</label>
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
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setComplaint({ ...complaint, document: file });
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
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
    </div>
  );
}

export default WomenChildDashboard;
