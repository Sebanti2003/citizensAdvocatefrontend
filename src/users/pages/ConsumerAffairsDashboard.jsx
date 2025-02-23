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
    <div className="h-screen w-full flex flex-col items-center relative overflow-auto">
      {/* Background with Indian flag colors - fixed to viewport */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>
      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main content container with proper padding and scrolling */}
      <div className="w-full max-w-7xl px-4 py-6 flex flex-col items-center relative z-10">
        <motion.h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Ministry of Consumer Affairs Dashboard
        </motion.h1>

        <motion.div
          className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col gap-4"
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
          
          {/* Form grid with better spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product ID</label>
              <input
                type="text"
                name="productId"
                value={complaint.productId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter Product ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
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
            <div className="bg-white/80 p-4 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-bold mb-2">Existing Complaints for {complaint.productName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredComplaints.map((comp, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-md flex flex-col gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold">{comp.description}</p>
                    <p className={`text-sm ${comp.status === "Resolved" ? "text-green-600" : "text-red-600"}`}>
                      Status: {comp.status}
                    </p>
                    <button
                      onClick={() => handleRepostComplaint(comp.description)}
                      className="py-1 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Repost the Same Complaint
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Select Category</label>
            <select
              name="category"
              value={complaint.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Choose Date</label>
            <input
              type="date"
              name="date"
              value={complaint.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Complaint Description</label>
            <textarea
              name="description"
              value={complaint.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              placeholder="Describe your complaint"
              rows="3"
            />
          </div>

          <div>
            <label clas
sName="block text-sm font-medium mb-1">Upload Supporting Document</label>
            <input 
              type="file" 
              className="w-full p-2 border border-gray-300 rounded-lg bg-white" 
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 mt-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Submit Complaint
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ConsumerAffairsDashboard;
