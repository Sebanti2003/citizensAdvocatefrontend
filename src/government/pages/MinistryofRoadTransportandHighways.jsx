import { useEffect, useState, useMemo } from "react";
import { FaSearch, FaCarCrash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getAllComplaints,
  transferComplaintsToMinistry,
  updateComplaintStatus,
} from "../../utils/complaintsStorage";

function RoadSafetyAndHighways() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isTransferMode, setIsTransferMode] = useState(false);
  const [selectedTransferComplaintIds, setSelectedTransferComplaintIds] = useState([]);
  const [targetMinistry, setTargetMinistry] = useState("");

  const complaintCategories = [
    "Road & Highway Conditions (Potholes, Damage)",
    "Traffic Congestion & Management",
    "Public Transport Service Issues",
    "Auto & Taxi Fare Complaints",
    "Drunk & Rash Driving Reports",
    "Parking Issues & Violations",
    "Accident & Emergency Response Delays",
    "License & Permit Issues",
    "Pollution & Emission Violations",
    "Road Signage & Traffic Light Malfunctions",
    "Corruption & Bribery in Transport Department",
  ];

  const [complaints, setComplaints] = useState([]);
  const transferMinistryOptions = [
    "Railways",
    "Education",
    "Health & Family Welfare",
    "Women & Child Development",
    "Consumer Affairs",
  ];

  useEffect(() => {
    const roadComplaints = getAllComplaints().filter(
      (complaint) => complaint.ministry === "Road Transport"
    );
    setComplaints(roadComplaints);
  }, []);

  const updateStatus = (id, newStatus) => {
    updateComplaintStatus(id, newStatus);
    const roadComplaints = getAllComplaints().filter(
      (complaint) => complaint.ministry === "Road Transport"
    );
    setComplaints(roadComplaints);
  };

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || c.status === statusFilter;

      const matchCategory =
        categoryFilter === "All" || c.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [complaints, search, statusFilter, categoryFilter]);

  const statusColor = (status) => {
    if (status === "Resolved")
      return "bg-green-500 text-white shadow-green-200";
    if (status === "Under Review")
      return "bg-yellow-500 text-white shadow-yellow-200";
    return "bg-red-500 text-white shadow-red-200";
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/ministry/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/govt/login");
    }
  };

  const handleTransferComplaint = () => {
    if (!selectedTransferComplaintIds.length || !targetMinistry) return;
    transferComplaintsToMinistry(selectedTransferComplaintIds, targetMinistry);
    const roadComplaints = getAllComplaints().filter(
      (complaint) => complaint.ministry === "Road Transport"
    );
    setComplaints(roadComplaints);
    setIsTransferMode(false);
    setSelectedTransferComplaintIds([]);
    setTargetMinistry("");
  };

  const toggleTransferSelection = (complaintId, checked) => {
    setSelectedTransferComplaintIds((prev) =>
      checked ? [...prev, complaintId] : prev.filter((id) => id !== complaintId)
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100">

      {/* SIDEBAR */}
      <div className="w-80 bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800 text-white shadow-2xl p-6">

        {/* TITLE */}
        <div className="flex items-center gap-3 mb-8">
          <FaCarCrash className="text-2xl text-yellow-300" />
          <h1 className="text-xl font-bold">
            Ministry of Road Transport & Highways
          </h1>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg mb-6">
          <FaSearch className="text-white/70" />
          <input
            className="bg-transparent w-full outline-none text-white placeholder-white/60"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* STATUS */}
        <h2 className="text-sm font-bold text-white/70 mb-2">
          STATUS
        </h2>

        {["All", "Pending", "Under Review", "Resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
              statusFilter === s
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}

        {/* CATEGORY */}
        <h2 className="text-sm font-bold text-white/70 mt-6 mb-2">
          CATEGORIES
        </h2>

        <div className="space-y-2 pr-1">
          <button
            onClick={() => setCategoryFilter("All")}
            className="w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            All Categories
          </button>

          {complaintCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                categoryFilter === cat
                  ? "bg-pink-500 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Road Safety Operations Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isTransferMode) {
                    setIsTransferMode(false);
                    setSelectedTransferComplaintIds([]);
                    setTargetMinistry("");
                    return;
                  }
                  setIsTransferMode(true);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
              >
                {isTransferMode ? "Cancel Transfer" : "Transfer Complaints"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
              >
                Logout
              </button>
            </div>
          </div>
          {isTransferMode && (
            <div className="mt-3 flex items-center gap-2">
              <select
                value={targetMinistry}
                onChange={(e) => setTargetMinistry(e.target.value)}
                className="border border-amber-500 text-amber-700 bg-amber-50 rounded-lg px-3 py-2"
              >
                <option value="">Select target ministry</option>
                {transferMinistryOptions.map((ministry) => (
                  <option key={ministry} value={ministry}>
                    {ministry}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTransferComplaint}
                disabled={!selectedTransferComplaintIds.length || !targetMinistry}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition disabled:opacity-60"
              >
                Transfer Selected ({selectedTransferComplaintIds.length})
              </button>
            </div>
          )}
          <p className="text-gray-600">
            Monitor road, transport & highway complaints
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-5">
          {filtered.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-indigo-500"
            >
              <div className="flex justify-between">

                {/* LEFT */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {c.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {c.description}
                  </p>

                  <div className="mt-3 text-sm text-indigo-600 font-semibold">
                    {c.category}
                  </div>

                  <div className="text-sm text-gray-400">
                    Assigned: {c.assignedTo || "-"}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  {isTransferMode && (
                    <div className="mb-3 flex justify-end">
                      <label className="inline-flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={selectedTransferComplaintIds.includes(c.id)}
                          onChange={(e) => toggleTransferSelection(c.id, e.target.checked)}
                        />
                        Select
                      </label>
                    </div>
                  )}

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold ${statusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>

                  <div className="mt-4">
                    <select
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value)
                      }
                      className="border p-2 rounded-lg text-sm shadow-md"
                    >
                      <option>Pending</option>
                      <option>Under Review</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default RoadSafetyAndHighways;
