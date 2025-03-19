import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FaTimes, FaPaperPlane, FaPhone, FaPaperclip } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const MinistryOfHealthAndFamilyWelfare = () => {
  // State Management
  const { gov_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
  const navigate = useNavigate();

  // Fetch complaints from API
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
  useEffect(() => {
    const me = async () => {
      try {
        const response = await axios.get(
          `https://citiadvo.onrender.com/api/v1/ministry/me`,
          { withCredentials: true }
        );
        console.log(response.data.user);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to load complaints.");
        navigate(`/govt/login`);

      } finally {
        setLoading(false);
      }
    };
    me();
  }, [
    navigate,
  ]);


  // Filter complaints based on selected category
  const filteredComplaints = useMemo(() => {
    if (selectedCategory === "All") return complaints;
    return complaints.filter(complaint => complaint.category === selectedCategory);
  }, [selectedCategory, complaints]);

  // Open chat for a specific complaint
  const openChat = (complaint) => {
    setSelectedComplaint({
      ...complaint,
      messages: complaint.messages || [],
    });
    setResponseText("");
    setIsChatOpen(true);
  };

  // Close chat modal
  const closeChat = () => {
    setIsChatOpen(false);
    setResponseText("");
  };

  // Send response to a complaint
  const sendResponse = async () => {
    if (!responseText.trim()) return;

    try {
      setSending(true);

      const response = await axios.post(
        `https://citiadvo.onrender.com/api/v1/complaints/respond`,
        {
          complaintId: selectedComplaint.id,
          response: responseText,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSelectedComplaint(prev => ({
          ...prev,
          messages: [...prev.messages, { text: responseText, sender: "You" }],
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  // Handle call action (placeholder)
  const handleCall = () => {
    alert("Call functionality not implemented yet.");
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.get(`https://citiadvo.onrender.com/api/v1/ministry/auth/logout`, {
        withCredentials: true,
      });
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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-12 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex justify-end w-full">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Ministry of Health & Family Welfare 🏥
        </h1>
        <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
          Ensuring public health, medical services, and family welfare.
        </p>
        <p className="text-gray-500">Department ID: <b>{gov_id}</b></p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

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
                <div className="font-semibold">{complaint.description}</div>
                <div className="text-gray-600 text-xs">~👤 {complaint.person}</div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No complaints found.</p>
          )}
        </ul>
      </div>

      {/* Chat Modal */}
      {isChatOpen && selectedComplaint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white w-[95%] md:w-[700px] h-[600px] rounded-lg shadow-2xl flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-semibold">Complaint Chat</h2>
              <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
              {/* Hospital ID */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Hospital ID</label>
                <input
                  type="text"
                  value={selectedComplaint.transportServiceNumber || "N/A"}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              {/* Hospital Name */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Hospital Name</label>
                <input
                  type="text"
                  value={selectedComplaint.transportServiceName || "N/A"}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              {/* Complaint Description */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Complaint Description</label>
                <textarea
                  value={selectedComplaint.description || "N/A"}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                  readOnly
                  rows={3}
                />
              </div>

              {/* Supporting Documents */}
              <div className="mb-3">
                <label className="block text-lg font-medium">Attached Files</label>
                {uploadedFiles.length > 0 ? (
                  <ul>
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                        <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No files attached.</p>
                )}
              </div>

              {/* Messages */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Responses</h3>
                {selectedComplaint.messages && selectedComplaint.messages.length > 0 ? (
                  selectedComplaint.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-lg ${
                        msg.sender === "You" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
                      }`}
                    >
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
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              {/* Call Button */}
              <button
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                title="Call"
                onClick={handleCall}
              >
                <FaPhone />
              </button>
              {/* Attachment Button */}
              <label
                className="cursor-pointer bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
                title="Attach File"
              >
                <FaPaperclip />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
              </label>
              {/* Send Button */}
              <button
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                onClick={sendResponse}
                disabled={sending}
                title="Send Message"
              >
                {sending ? "Sending..." : <FaPaperPlane />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MinistryOfHealthAndFamilyWelfare;