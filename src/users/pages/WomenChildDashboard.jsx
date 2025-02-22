import { useState } from "react";
import { motion } from "framer-motion";

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
    serviceNumber: "",
    serviceName: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "serviceNumber") {
      const serviceName = serviceData[value] || "";
      setComplaint({ ...complaint, serviceNumber: value, serviceName });

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
      <motion.h1 className="text-4xl font-extrabold text-purple-800 text-center mt-6">
        Women and Child Development Dashboard
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
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {filteredComplaints.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-bold mb-4">Previous Cases for {complaint.serviceName}</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-lg font-medium">Date of Incident</label>
            <input
              type="date"
              name="date"
              value={complaint.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-lg font-medium">Case Description</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Please provide details of your case"
            rows="3"
          />
        </div>

        <div className="mt-4">
          <label className="block text-lg font-medium">Upload Supporting Documents</label>
          <input type="file" className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
        >
          Submit Complaint
        </button>
      </motion.div>
    </div>
  );
}

export default WomenChildDashboard;

