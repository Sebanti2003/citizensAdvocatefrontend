import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes, FaPaperPlane, FaPhone, FaPaperclip } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const MinistryofRailways = () => {
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
    // const [uploadedFiles, setUploadedFiles] = useState([]);
    // const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [complaintsRes, employeesRes] = await Promise.all([
    //                 axios.get(
    //                     `http://localhost:3000/api/v1/complaints/eachDepartmentalComplaints`,
    //                     { withCredentials: true }
    //                 ),
    //                 axios.get(
    //                     `http://localhost:3000/api/v1/employees/department/${gov_id}`,
    //                     { withCredentials: true }
    //                 )
    //             ]);

    //             setCategories(complaintsRes.data.categories || []);
    //             setComplaints(complaintsRes.data.complaints || []);
    //             setEmployees(employeesRes.data.employees || []);
    //         } catch (err) {
    //             console.error("Error fetching data:", err);
    //             setError("Failed to load data.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [gov_id]);

    // const filteredComplaints = useMemo(() => {
    //     if (selectedCategory === "All") return complaints;
    //     return complaints.filter((complaint) => complaint.category === selectedCategory);
    // }, [selectedCategory, complaints]);

    // const handleAssignEmployee = async (complaintId, employeeId) => {
    //     try {
    //         await axios.put(
    //             `http://localhost:3000/api/v1/complaints/${complaintId}/assign`,
    //             { employeeId },
    //             { withCredentials: true }
    //         );

    //         setComplaints(prev => prev.map(complaint => 
    //             complaint._id === complaintId 
    //                 ? { ...complaint, assignedEmployee: employees.find(e => e._id === employeeId) } 
    //                 : complaint
    //         ));
    //     } catch (error) {
    //         console.error("Assignment failed:", error);
    //         setError("Failed to assign employee.");
    //     }
    // };

    // const openChat = (complaint) => {
    //     setSelectedComplaint(complaint);
    //     setIsChatOpen(true);
    // };

    // const closeChat = () => {
    //     setIsChatOpen(false);
    //     setResponseText("");
    //     setUploadedFiles([]);
    // };

    // const handleLogout = async () => {
    //     setLoading(true);
    //     setError("");
    //     try {
    //         await axios.get(`http://localhost:3000/api/v1/ministry/auth/logout`);
    //         navigate(`/govt/login`);
    //     } catch (err) {
    //         console.error(err);
    //         setError(err.response?.data?.message || "Error logging out");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const sendResponse = async () => {
    //     if (!responseText.trim()) return;

    //     setSending(true);
    //     try {
    //         await axios.post(`http://localhost:3000/api/v1/complaints/respond`, {
    //             complaintId: selectedComplaint._id,
    //             response: responseText,
    //         });

    //         setSelectedComplaint((prev) => ({
    //             ...prev,
    //             messages: [...(prev?.messages || []), { text: responseText, sender: "You" }],
    //         }));
    //         setResponseText("");
    //     } catch (error) {
    //         console.error("Error sending response:", error);
    //         setError("Failed to send response.");
    //     } finally {
    //         setSending(false);
    //     }
    // };

    // const handleFileUpload = (event) => {
    //     const files = Array.from(event.target.files);
    //     setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    // };

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
    //         </div>
    //     );
    // }
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

            const response = await axios.post(`http://localhost:3000/api/v1/complaints/respond`, {
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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Ministry of Railways 🚆</h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Overseeing railway services, passenger safety, and operational efficiency.
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
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}

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
                                <div className="flex items-center gap-4">
                                    {/* <select
                                        value={complaint.assignedEmployee?._id || ""}
                                        onChange={(e) => handleAssignEmployee(complaint._id, e.target.value)}
                                        className="p-2 border rounded-lg bg-white text-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="">Assign to...</option>
                                        {employees.map((employee) => (
                                            <option key={employee._id} value={employee._id}>
                                                {employee.name} ({employee.position})
                                            </option>
                                        ))}
                                    </select> */}
                                    <div className="text-gray-600 text-xs">~👤 {complaint.person}</div>
                                </div>
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
                    <div className="bg-white w-[95%] md:w-[700px] h-[600px] rounded-lg shadow-2xl flex flex-col">
                        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                            <h2 className="text-xl font-semibold">Railway Complaint Chat</h2>
                            <FaTimes className="cursor-pointer text-2xl" onClick={closeChat} />
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Assigned To</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.assignedEmployee?.name || "Unassigned"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Train Number</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.trainNumber || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Train Name</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.trainName || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-lg font-medium">PNR</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.pnr || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Product ID</label>
                                <input
                                    type="text"
                                    value={selectedComplaint.productid || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Description</label>
                                <textarea
                                    value={selectedComplaint.description || "N/A"}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                                    readOnly
                                    rows={3}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-lg font-medium">Documents</label>
                                <div className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50">
                                    {selectedComplaint.documents && selectedComplaint.documents.length > 0 ? (
                                        <ul>
                                            {selectedComplaint.documents.map((doc, index) => (
                                                <li key={index} className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                                                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                        {doc.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No documents available</p>
                                    )}
                                </div>
                            </div>

                            <ul>
                                {/* {uploadedFiles.map((file, index) => (
                                    <li key={index} className="text-gray-700">{file.name}</li>
                                ))} */}
                            </ul>
                        </div>

                        <div className="p-4 flex items-center gap-2">
                            <input
                                className="flex-1 p-2 border rounded-lg"
                                value={responseText}
                                onChange={(e) => setResponseText(e.target.value)}
                                placeholder="Write a response..."
                            />
                            <button
                                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                                title="Call"
                            >
                                <FaPhone />
                            </button>
                            <label
                                className="cursor-pointer bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
                                title="Attach Documents"
                            >
                                <FaPaperclip />
                                {/* <input type="file" multiple className="hidden" onChange={handleFileUpload} /> */}
                            </label>
                            <button
                                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={sendResponse}
                                disabled={sending}
                                title="Send Message"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MinistryofRailways;