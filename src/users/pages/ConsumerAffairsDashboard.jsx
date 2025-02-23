import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

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

  // const categories = [
  //   "Defective or Fake Products",
  //   "Online Shopping Scams",
  //   "Delayed or Non-Delivery of Orders",
  //   "Misleading Advertisements",
  //   "Poor Customer Service & Refund Issues",
  //   "Price Hike & Overcharging",
  //   "Food Adulteration & Expired Products",
  //   "Warranty & Guarantee Violations",
  //   "Fraudulent Business Practices",
  //   "Electricity & Water Bill Complaints",
  //   "Telecom & Internet Service Issues",
  // ];

  const [complaint, setComplaint] = useState({
    productId: "",
    productName: "",
    category: "",
    date: "",
    description: "",
    document: null,
  });

  // const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "productId") {
      const productName = productData[value] || "";
      setComplaint({ ...complaint, productId: value, productName });
    } else {
      setComplaint({ ...complaint, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setComplaint({ ...complaint, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productid", complaint.productId);
    formData.append("productname", complaint.productName);
    formData.append("category", complaint.category);
    formData.append("date", complaint.date);
    formData.append("description", complaint.description);
    if (complaint.document) {
      formData.append("document", complaint.document);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/complaints/ministryofConsumerAffairspostcomplaint",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setSuccessMessage("✅ Complaint Submitted Successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("❌ Failed to submit complaint. Please try again.");
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedComplaint(null);
  };

  const sendResponse = async () => {
    if (!responseText.trim()) return;
    setSending(true);

    try {
      // Simulating sending response (Replace with actual API call if needed)
      setTimeout(() => {
        setSending(false);
        setResponseText("");
      }, 1000);
    } catch (error) {
      console.error("Error sending response:", error);
      setSending(false);
    }
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

        <div className="mt-4">
          <label className="block text-lg font-medium">Upload Supporting Document</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </motion.div>

      {isChatOpen && selectedComplaint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white bg-opacity-90 w-[95%] md:w-[700px] h-[600px] rounded-lg shadow-2xl flex flex-col">
            <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-semibold">Consumer Complaint Chat</h2>
              <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
            </div>

            <div className="p-4 bg-gray-200 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 p-3 border rounded-lg"
                placeholder="Type your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              <button className="bg-green-600 text-white p-3 rounded-lg" onClick={sendResponse} disabled={sending}>
                {sending ? "Sending..." : <FaPaperPlane />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ConsumerAffairsDashboard;
