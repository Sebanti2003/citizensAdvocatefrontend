import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ministryofconsumeraffairsfoodandpublicdistributioncomplaints, ministryofconsumeraffairsfoodandpublicdistributioncategories } from "../data/complaints";
import { FaPhone, FaPaperclip, FaMicrophone } from "react-icons/fa";

const MinistryofConsumerAffairsFoodandPublicDistribution = () => {
    const { gov_id } = useParams();
    const allcomplaints = ministryofconsumeraffairsfoodandpublicdistributioncomplaints;
    const allcategories = ministryofconsumeraffairsfoodandpublicdistributioncategories;

    const [categories] = useState(allcategories);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [complaints, setComplaints] = useState(allcomplaints);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (selectedCategory === "All") {
            setComplaints(allcomplaints);
        } else {
            setComplaints(allcomplaints.filter(complaint => complaint.category === selectedCategory));
        }
    }, [selectedCategory, allcomplaints]);

    const openChat = (complaint) => {
        setSelectedComplaint(complaint);
        setChatMessages([{ sender: "user", text: complaint.complaint }]);
    };

    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        setChatMessages([...chatMessages, { sender: "admin", text: newMessage }]);
        setNewMessage("");
    };

    const closeChat = () => {
        setSelectedComplaint(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 md:p-12 flex flex-col items-center">
            <div className="text-center flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Ministry of Consumer Affairs, Food & Public Distribution 🍚
                </h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Overseeing food security, ration distribution, and consumer protection to ensure fair and
                    quality access to essential goods for all citizens.
                </p>
                <p className="text-gray-500">Department ID: <b>{gov_id}</b></p>
            </div>

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

            <div className="mt-12 w-full max-w-5xl">
                <h2 className="text-2xl font-semibold text-gray-800">List of Complaints</h2>
                <ul className="mt-4 bg-white flex flex-col gap-2 shadow-lg rounded-lg p-6 divide-y divide-gray-200">
                    {complaints.length > 0 ? complaints.map(complaint => (
                        <li
                            key={complaint.id}
                            className="py-3 px-4 bg-gray-50 border-2 border-gray-200 flex justify-between items-center hover:bg-gray-100 transition rounded-md cursor-pointer"
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

            <AnimatePresence>
                {selectedComplaint && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeChat}
                        />

                        <motion.div
                            className="fixed top-1/2 left-1/2 bg-white shadow-lg rounded-lg w-[600px] h-[650px] flex flex-col p-4"
                            initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                            exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                        >
                            <div className="bg-yellow-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-semibold">Complaint Chat</h3>
                                <button className="text-white text-lg font-bold" onClick={closeChat}>×</button>
                            </div>

                            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-2">
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 my-1 rounded-lg max-w-xs ${
                                            msg.sender === "user"
                                                ? "bg-gray-200 self-start"
                                                : "bg-yellow-500 text-white self-end"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 p-3 flex gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Type a response..."
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button className="bg-yellow-600 text-white p-3 rounded-lg" onClick={sendMessage}>
                                    Send
                                </button>
                                <button className="bg-gray-200 text-gray-700 p-3 rounded-lg" title="Call">
                                    <FaPhone />
                                </button>
                                <button className="bg-gray-200 text-gray-700 p-3 rounded-lg" title="Attach File">
                                    <FaPaperclip />
                                </button>
                                <button className="bg-gray-200 text-gray-700 p-3 rounded-lg" title="Voice Message">
                                    <FaMicrophone />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MinistryofConsumerAffairsFoodandPublicDistribution;