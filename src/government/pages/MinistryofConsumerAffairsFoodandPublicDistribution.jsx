import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const MinistryofConsumerAffairs = () => {
    const { gov_id } = useParams();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseText, setResponseText] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch complaints from API
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/complaints/eachDepartmentalComplaints`,
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

    // ✅ Use useMemo to filter complaints based on category
    const filteredComplaints = useMemo(() => {
        if (selectedCategory === "All") return complaints;
        return complaints.filter(complaint => complaint.category === selectedCategory);
    }, [selectedCategory, complaints]);

    const openChat = (complaint) => {
        setSelectedComplaint(complaint);
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setResponseText("");
    };

    const handleLogout = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.get(`http://localhost:3000/api/v1/ministry/auth/logout`);
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

    const sendResponse = async () => {
        if (!responseText.trim()) return;
        try {
            await axios.post(`http://localhost:3000/api/v1/complaints/respond`, {
                complaintId: selectedComplaint.id,
                response: responseText
            });
            alert("Response Sent!");
            closeChat();
        } catch (err) {
            console.error("Error sending response:", err);
            setError("Failed to send response.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-12 flex flex-col items-center">
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
                    Ministry of Consumer Affairs 🏪
                </h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Ensuring consumer rights, product safety, and fair trade practices.
                </p>
                <p className="text-gray-500">Department ID: <b>{gov_id}</b></p>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Category Selection */}
            <div className="mt-8 w-full max-w-md">
                <label className="block text-lg text-gray-700 font-semibold mb-2">Select Category</label>
                <select
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-green-300 transition"
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

            {/* Chat Modal */}
            {isChatOpen && selectedComplaint && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div className="bg-white w-[90%] md:w-[600px] h-[500px] rounded-lg shadow-xl flex flex-col">
                        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                            <h2 className="text-xl font-semibold">Complaint Chat</h2>
                            <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="bg-gray-100 p-4 rounded-lg shadow mb-2">
                                <strong>Complaint:</strong>
                                <p className="text-gray-600">{selectedComplaint.description}</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow text-right">
                                <strong>Response:</strong> {responseText || "No response yet"}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-b-lg flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
                                placeholder="Type your response..."
                                value={responseText}
                                onChange={(e) => setResponseText(e.target.value)}
                            />
                            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition" onClick={sendResponse}>
                                <FaPaperPlane className="text-xl" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MinistryofConsumerAffairs;
