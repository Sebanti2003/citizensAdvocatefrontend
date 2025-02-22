import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa"; // Bell icon for notifications

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'resolved'
  const [notifications, setNotifications] = useState({}); // Stores unread notifications

  // Fetch complaints from the API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/complaints/user",
          { withCredentials: true }
        );
        setComplaints(response.data);

        // Initialize notifications (unread for resolved complaints)
        const initialNotifications = {};
        response.data.forEach((complaint) => {
          if (complaint.status === "Resolved") {
            initialNotifications[complaint.id] = true;
          }
        });
        setNotifications(initialNotifications);
      } catch (err) {
        setError("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on selected status
  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === "all") return true;
    return complaint.status.toLowerCase() === filter;
  });

  // Handle notification click
  const handleNotificationClick = (id) => {
    alert("📢 Your complaint has been resolved!");
    setNotifications((prev) => ({ ...prev, [id]: false })); // Mark as read
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700">📌 Citizen Dashboard</h2>

        {/* Status Filter Buttons */}
        <div className="flex gap-3 mt-4">
          {["all", "pending", "resolved"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded ${
                filter === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Show loading/error messages */}
        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Complaints Table */}
        {!loading && !error && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Train</th>
                  <th className="p-3 text-left">PNR</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Notifications</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{`${complaint.trainName} (${complaint.trainNumber})`}</td>
                    <td className="p-3">{complaint.pnr}</td>
                    <td className="p-3">{complaint.date}</td>
                    <td
                      className={`p-3 font-semibold ${
                        complaint.status === "Pending"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {complaint.status}
                    </td>
                    <td className="p-3">{complaint.description}</td>
                    <td className="p-3">
                      {complaint.status === "Resolved" && (
                        <button
                          className="relative text-blue-500 hover:text-blue-700"
                          onClick={() => handleNotificationClick(complaint.id)}
                        >
                          <FaBell size={20} />
                          {/* Show red dot for unread notifications */}
                          {notifications[complaint.id] && (
                            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
