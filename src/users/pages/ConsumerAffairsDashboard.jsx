import { useState } from "react";
import { motion } from "framer-motion";

function ConsumerAffairsDashboard() {
  const productData = {
    101: "XYZ Electronics TV",
    202: "ABC Home Refrigerator",
    303: "DEF Mobile Phone",
    404: "GHI Washing Machine",
    505: "JKL Microwave Oven",
    606: "MNO Air Conditioner",
    707: "PQR Water Purifier",
    808: "STU Laptop",
    909: "VWX Smartwatch",
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
    "Telecom & Internet Service Issues"
  ];

  const sampleComplaints = {
    101: [
      { description: "TV screen flickers frequently.", status: "Pending" },
      { description: "Remote control not working.", status: "Resolved" },
    ],
    202: [
      { description: "Refrigerator not cooling properly.", status: "Pending" },
      { description: "Strange noise coming from the compressor.", status: "Resolved" },
    ],
    303: [
      { description: "Mobile battery drains too fast.", status: "Pending" },
      { description: "Camera quality is poor despite high specifications.", status: "Resolved" },
    ],
  };

  const [complaint, setComplaint] = useState({
    productId: "",
    productName: "",
    category: "",
    purchaseDate: "",
    description: "",
    document: null,
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "productId") {
      const productName = productData[value] || "";
      setComplaint({ ...complaint, productId: value, productName });

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
      <motion.h1 className="text-4xl font-extrabold text-blue-800 text-center mt-6">
        Ministry of Consumer Affairs Dashboard
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
            <label className="block text-lg font-medium">Product ID</label>
            <input
              type="text"
              name="productId"
              value={complaint.productId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter Product ID"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              value={complaint.productName}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {filteredComplaints.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-bold mb-4">Existing Complaints for {complaint.productName}</h3>
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

        {/* Category Selection - New Addition */}
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
        
        {/* Choose Date */}
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
          <input type="file" className="w-full p-2 border border-gray-300 rounded-lg" />
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

export default ConsumerAffairsDashboard;