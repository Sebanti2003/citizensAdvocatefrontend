import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ministryofrailwayscomplaints, ministryofrailwayscategories } from "../data/complaints";
import { FaPhone, FaMicrophone, FaPaperclip, FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const MinistryofRailways = () => {
    const { gov_id } = useParams();
    const allcomplaints = ministryofrailwayscomplaints;
    const allcategories = ministryofrailwayscategories;

    const [categories] = useState(allcategories);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [complaints, setComplaints] = useState(allcomplaints);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseText, setResponseText] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (selectedCategory === "All") {
            setComplaints(allcomplaints);
        } else {
            setComplaints(allcomplaints.filter(complaint => complaint.category === selectedCategory));
        }
    }, [selectedCategory, allcomplaints]);

    const openChat = (complaint) => {
        setSelectedComplaint(complaint);
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setResponseText("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-12 flex flex-col items-center">
            {/* Header */}
            <div className="text-center flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Ministry of Railways 🚆
                </h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Overseeing railway services, passenger safety, and operational efficiency to ensure smooth travel experiences for all citizens.
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
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Complaints Section */}
            <div className="mt-12 w-full max-w-5xl">
                <h2 className="text-2xl font-semibold text-gray-800">List of Complaints</h2>
                <ul className="mt-4 bg-white flex flex-col gap-2 shadow-lg rounded-lg p-6 divide-y divide-gray-200">
                    {complaints.length > 0 ? complaints.map(complaint => (
                        <li 
                            key={complaint.id} 
                            className="py-3 px-4 bg-gray-50 border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition rounded-md cursor-pointer"
                            onClick={() => openChat(complaint)}
                        >
                            <div className="flex max-md:text-sm justify-center items-center gap-3 capitalize font-semibold">
                                <div>{complaint.category.split(" ").pop()}</div>
                                <div>{complaint.complaint}</div>
                            </div>
                            <div className="text-gray-600 text-xs">~👤 {complaint.author}</div>
                        </li>
                    )) : (
                        <p className="text-gray-500 text-center py-4">No complaints found for this category.</p>
                    )}
                </ul>
            </div>

            {/* Chat Modal */}
            {isChatOpen && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div className="bg-white w-[90%] md:w-[600px] h-[500px] rounded-lg shadow-xl flex flex-col">
                        {/* Chat Header */}
                        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                            <h2 className="text-xl font-semibold">Complaint Chat</h2>
                            <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="bg-gray-100 p-4 rounded-lg shadow mb-2">
                                <strong>Complaint:</strong> {selectedComplaint.complaint}
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow text-right">
                                <strong>Response:</strong> {responseText || "No response yet"}
                            </div>
                        </div>

                        {/* Chat Input Section */}
                        <div className="p-4 bg-gray-100 rounded-b-lg flex items-center gap-2">
                            <input 
                                type="text" 
                                className="flex-1 p-2 border border-gray-300 rounded-lg outline-none" 
                                placeholder="Type your response..." 
                                value={responseText} 
                                onChange={(e) => setResponseText(e.target.value)}
                            />
                            <button className="text-gray-700 hover:text-blue-500 transition">
                                <FaPhone className="text-2xl" />
                            </button>
                            <button className="text-gray-700 hover:text-blue-500 transition">
                                <FaPaperclip className="text-2xl" />
                            </button>
                            <button className="text-gray-700 hover:text-blue-500 transition">
                                <FaMicrophone className="text-2xl" />
                            </button>
                            <button 
                                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={() => alert("Response Sent!")}
                            >
                                <FaPaperPlane className="text-xl" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MinistryofRailways;
