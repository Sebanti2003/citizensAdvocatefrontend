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

  // Only Pending Complaints
  const previousComplaints = [
    {
      id: 1,
      productid: "1001",
      productname: "Amazon India",
      category: "Delayed or Non-Delivery of Orders",
      date: "2026-04-10",
      description:
        "Order delivery has been delayed for more than 10 days.",
      status: "Pending",
    },
    {
      id: 2,
      productid: "1002",
      productname: "Flipkart",
      category: "Defective or Fake Products",
      date: "2026-04-18",
      description:
        "Received a damaged mobile phone instead of a new one.",
      status: "Pending",
    },
    {
      id: 3,
      productid: "1008",
      productname: "Airtel",
      category: "Telecom & Internet Service Issues",
      date: "2026-04-22",
      description:
        "Internet service has been down frequently for the past week.",
      status: "Pending",
    },
  ];

  const [complaint, setComplaint] = useState({
    productid: "",
    productname: "",
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

    if (name === "productid") {
      const productname = productData[value] || "";

      setComplaint({
        ...complaint,
        productid: value,
        productname,
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
      productid: oldComplaint.productid,
      productname: oldComplaint.productname,
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
          productid: "",
          productname: "",
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
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-white to-green-600 transform -skew-y-6"></div>

      <div className="fixed inset-0 bg-white opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4">
        <motion.h1
          className="text-2xl md:text-4xl font-extrabold text-blue-800 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ministry of Consumer Affairs
        </motion.h1>

        {/* Complaint Form */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8 mb-6 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {(successMessage || errorMessage) && (
            <motion.div
              className={`w-full text-center text-lg font-semibold py-2 rounded-lg ${
                successMessage
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {successMessage || errorMessage}
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-gray-800">
            File a New Complaint
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product ID */}
            <div>
              <label className="block text-lg font-medium">
                Product/Service ID
              </label>

              <input
                type="text"
                name="productid"
                value={complaint.productid}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Product/Service ID"
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-lg font-medium">
                Product/Service Name
              </label>

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

          {/* Category */}
          <div>
            <label className="block text-lg font-medium">
              Select Category
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
            <label className="block text-lg font-medium">
              Choose Date
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
            <label className="block text-lg font-medium">
              Complaint Description
            </label>

            <textarea
              name="description"
              value={complaint.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Describe your complaint"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">
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
            <label className="block text-lg font-medium">
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
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Submit Complaint
          </button>
        </motion.div>

        {/* Previous Complaints Section */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Similar Pending Complaints
          </h2>

          <div className="space-y-4">
            {previousComplaints.map((item) => (
              <motion.div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700">
                      {item.productname}
                    </h3>

                    <p className="text-sm text-gray-600">
                      Product ID: {item.productid}
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

export default ConsumerAffairsDashboard;
