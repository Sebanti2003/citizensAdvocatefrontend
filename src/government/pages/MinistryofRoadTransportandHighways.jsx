import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const RoadSafetyAndHighways = () => {
    const { gov_id } = useParams();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseText, setResponseText] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false); // Added missing sending state
    const navigate = useNavigate();

    useEffect(() => {
      const fetchComplaints = async () => {
          try {
              const response = await axios.get(
                  `https://citiadvo.onrender.com/api/v1/complaints/eachDepartmentalComplaints`,
                  { withCredentials: true }
              );
              setCategories(response.data.categories || []);
              setComplaints(response.data.complaints || []);
          } catch (err) {
              console.error("Error fetching complaints:", err);
              setError("Failed to load complaints.");
          } finally {
              setLoading(false);
          }
      };
      fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
      if (selectedCategory === "All") return complaints;
      return complaints.filter(complaint => complaint.category === selectedCategory);
  }, [selectedCategory, complaints]);

  const openChat = (complaint) => {
      setSelectedComplaint({
          ...complaint,
          messages: complaint.messages || [],
      });
      setResponseText("");
      setIsChatOpen(true);
  };

  const closeChat = () => {
      setIsChatOpen(false);
      setResponseText("");
  };

  const sendResponse = async () => {
      if (!responseText.trim()) return;

      try {
          setSending(true);

          const response = await axios.post(`https://citiadvo.onrender.com/api/v1/complaints/respond`, {
              complaintId: selectedComplaint.id,
              response: responseText
          }, { withCredentials: true });

          if (response.status === 200) {
              setSelectedComplaint(prev => ({
                  ...prev,
                  messages: [...prev.messages, { text: responseText, sender: "You" }]
              }));

              setResponseText("");
          }
      } catch (err) {
          console.error("Error sending response:", err);
          setError("Failed to send response. Please try again.");
      } finally {
          setSending(false);
      }
  };

  const handleLogout = async () => {
      setLoading(true);
      setError("");
      try {
          await axios.get(`https://citiadvo.onrender.com/api/v1/ministry/auth/logout`);
          setCategories([]);
          setComplaints([]);
          navigate(`/govt/login`);
      } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || "Error logging out");
      } finally {
          setLoading(false);
      }
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
          </div>
      );
  }
  console.log(selectedComplaint);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-12 flex flex-col items-center">
            <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
                <div className="flex justify-end w-full">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Ministry of Road Safety & Highways 🚗🛣️
                </h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Addressing road safety, traffic management, and infrastructure development.
                </p>
                <p className="text-gray-500">Department ID: <b>{gov_id}</b></p>
            </div>

            {/* Category Selection */}
            <div className="mt-8 w-full max-w-md">
                <label className="block text-lg text-gray-700 font-semibold mb-2">Select Category</label>
                <select
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 transition"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            {/* Complaints Section */}
            <div className="mt-12 w-full max-w-5xl">
                <h2 className="text-2xl font-semibold text-gray-800">List of Complaints</h2>
                <ul className="mt-4 bg-white flex flex-col gap-2 shadow-lg rounded-lg p-6 divide-y divide-gray-200">
                    {filteredComplaints.length > 0 ? (
                        filteredComplaints.map((complaint, index) => (
                            <li
                                key={index}
                                className="py-3 px-4 bg-gray-50 border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition rounded-md cursor-pointer"
                                onClick={() => openChat(complaint)}
                            >
                                <div className="flex max-md:text-sm justify-center items-center gap-3 capitalize font-semibold">
                                    <div>{complaint.description}</div>
                                </div>
                                <div className="text-gray-600 text-xs">~👤 {complaint.person}</div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">No complaints found.</p>
                    )}
                </ul>
            </div>

            {isChatOpen && selectedComplaint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white bg-opacity-90 w-[95%] md:w-[700px] h-[600px] rounded-lg shadow-2xl flex flex-col">

            {/* Chat Header */}
            <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-semibold">Consumer Complaint Chat</h2>
              <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-100">

              {/* Product ID */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Product ID</label>
                <input
                  type="text"
                  value={selectedComplaint.productid || ""}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              {/* Product Name */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Product Name</label>
                <input
                  type="text"
                  value={selectedComplaint.productName || ""}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              {/* Complaint */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Complaint</label>
                <textarea
                  value={selectedComplaint.description || ""}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  rows="3"
                  readOnly
                />
              </div>

              {/* Supporting Documents */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Supporting Documents</label>
                {selectedComplaint.documents && selectedComplaint.documents.length > 0 ? (
                  selectedComplaint.documents.map((doc, index) => (
                    <div key={index} className="text-blue-600 underline cursor-pointer">
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        Document {index + 1}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No documents attached.</p>
                )}
              </div>

              {/* Messages */}
              <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Responses</h3>
                {selectedComplaint.messages.length > 0 ? (
                  selectedComplaint.messages.map((msg, index) => (
                    <div key={index} className={`mb-2 p-2 rounded-lg ${msg.sender === "You" ? "bg-green-200 text-right" : "bg-gray-200 text-left"}`}>
                      <p className="text-gray-800">{msg.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No messages yet.</p>
                )}
              </div>
            </div>

            {/* Chat Footer */}
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
              <button className="bg-blue-500 text-white p-3 rounded-lg">
                📞 Call
              </button>
              <button className="bg-gray-500 text-white p-3 rounded-lg">
                📎 Attach
              </button>
            </div>
          </div>
        </motion.div>
      )}
        </div>
    );
};

export default RoadSafetyAndHighways;
