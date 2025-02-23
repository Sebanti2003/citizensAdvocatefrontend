import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function ConsumerAffairsDashboard() {
  const productData = {
    1001: "Amazon India",
    1002: "Flipkart",
    1003: "Myntra",
    1004: "Reliance Digital",
    1005: "BigBasket",
    1006: "Swiggy",
    1007: "Zomato",
    1008: "Airtel",
    1009: "Jio",
    1010: "Tata CLiQ",
  };

  const categories = [
    "Defective or Fake Products",
    "Online Shopping Scams",
    "Delayed or Non-Delivery of Orders",
    "Misleading Advertisements",
    "Poor Customer Service & Refund Issues",
    "Price Hike & Overcharging",
    "Food Adulteration & Expired Products",
    "Warranty & Guarantee Violations",
    "Fraudulent Business Practices",
    "Electricity & Water Bill Complaints",
    "Telecom & Internet Service Issues",
  ];

  const sampleComplaints = {
    1001: [
      { description: "Received counterfeit product.", status: "Pending" },
      { description: "Refund not processed after return.", status: "Resolved" },
    ],
    1002: [
      { description: "Order delayed by 2 weeks.", status: "Pending" },
      { description: "Wrong item delivered.", status: "Resolved" },
    ],
    1003: [
      { description: "Size chart misleading.", status: "Pending" },
      { description: "Quality different from advertised.", status: "Resolved" },
    ],
  };

  const [complaint, setComplaint] = useState({
    productid: "",
    productname: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "productid") {
      const productname = productData[value] || "";
      setComplaint({ ...complaint, productid: value, productname });
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
    try {
      e.preventDefault();

      const response = await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofconsumeraffairspostcomplaint",
        {
          productid: complaint.productid,
          productname: complaint.productname,
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
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSuccessMessage("❌ Failed to submit complaint. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background design */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>
      <div className="fixed inset-0 bg-white opacity-10"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        <motion.h1
          className="text-4xl font-extrabold text-blue-800 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ministry of Consumer Affairs
        </motion.h1>

        <motion.div
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {successMessage && (
            <motion.div
              className={`w-full text-center text-lg font-semibold py-2 rounded-lg ${
                successMessage.includes("❌")
                  ? "text-red-700 bg-red-100"
                  : "text-green-700 bg-green-100"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {successMessage}
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-gray-800">File a New Complaint</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium">Product/Service ID</label>
              <input
                type="text"
                name="productid"
                value={complaint.productid}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Product/Service ID"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Product/Service Name</label>
              <input
                type="text"
                name="productname"
                value={complaint.productname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                placeholder="Enter Product/Service Name"
              />
            </div>
          </div>

          {filteredComplaints.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-bold mb-4">
                Existing Complaints for {complaint.productname}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredComplaints.map((comp, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold">{comp.description}</p>
                    <p
                      className={`text-sm ${
                        comp.status === "Resolved" ? "text-green-600" : "text-red-600"
                      }`}
                    >
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
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Submit Complaint
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ConsumerAffairsDashboard;
