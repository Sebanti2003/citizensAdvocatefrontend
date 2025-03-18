import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const MinistryofWomenChildDevelopment = () => {
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/complaints/eachDepartmentalComplaints`,
                    { withCredentials: true }
                );
                console.log(response.data);
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
    }, [gov_id]);

    const filteredComplaints = useMemo(() => {
        if (selectedCategory === "All") return complaints;
        return complaints.filter((complaint) => complaint.category === selectedCategory);
    }, [selectedCategory, complaints]);

    const openChat = (complaint) => {
        setSelectedComplaint(complaint);
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setResponseText("");
    };

    const sendResponse = async () => {
        if (!responseText.trim()) return;
        setSending(true);
        try {
            await axios.post(
                `http://localhost:3000/api/v1/complaints/respond/${selectedComplaint.id}`,
                { message: responseText },
                { withCredentials: true }
            );
            setSelectedComplaint((prev) => ({
                ...prev,
                messages: [...prev.messages, { sender: "You", text: responseText }],
            }));
            setResponseText("");
        } catch (err) {
            console.error("Error sending response:", err);
            setError("Failed to send response.");
        } finally {
            setSending(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.get(`http://localhost:3000/api/v1/ministry/auth/logout`, { withCredentials: true });
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
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-6 md:p-12 flex flex-col items-center">
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
                    Ministry of Women & Child Development 👩‍👧‍👦
                </h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Addressing issues related to women’s rights, child welfare, and social development.
                </p>
                <p className="text-gray-500">
                    Department ID: <b>{gov_id}</b>
                </p>
            </div>

            {/* Category Selection */}
            <div className="mt-8 w-full max-w-md">
                <label className="block text-lg text-gray-700 font-semibold mb-2">Select Category</label>
                <select
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-pink-300 transition"
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
                        <div className="bg-pink-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                            <h2 className="text-xl font-semibold">Complaint Chat</h2>
                            <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
                            {/* Issue Code */}
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Issue Code</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.issueCode || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>

                            {/* Issue Type */}
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Issue Type</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.issueType || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Description</label>
                                <textarea
                                    value={selectedComplaint.description || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                                    readOnly
                                    rows={3}
                                />
                            </div>

                            {/* Messages */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Responses</h3>
                                {selectedComplaint.messages && selectedComplaint.messages.length > 0 ? (
                                    selectedComplaint.messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`mb-2 p-2 rounded-lg ${
                                                msg.sender === "You" ? "bg-pink-100 text-right" : "bg-gray-200 text-left"
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
                            <button
                                className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition"
                                onClick={sendResponse}
                                disabled={sending}
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

export default MinistryofWomenChildDevelopment;