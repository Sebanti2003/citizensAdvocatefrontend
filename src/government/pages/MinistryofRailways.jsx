import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaTrain } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  deleteComplaintById,
  getAllComplaints,
  transferComplaintsToMinistry,
  updateComplaintComment,
  updateComplaintStatus,
} from "../../utils/complaintsStorage";

function MinistryofRailways() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);
  const [commentModalComplaint, setCommentModalComplaint] = useState(null);
  const [deleteModalComplaint, setDeleteModalComplaint] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [isTransferMode, setIsTransferMode] = useState(false);
  const [selectedTransferComplaintIds, setSelectedTransferComplaintIds] = useState([]);
  const [targetMinistry, setTargetMinistry] = useState("");

  const complaintCategories = [
    "Train Delay & Rescheduling",
    "Train Cleanliness & Hygiene",
    "Food Quality & Availability",
    "Ticket Booking & Cancellation Issues",
    "Refund & Payment Problems",
    "Coach & Seat Allocation Issues",
    "Security & Theft Complaints",
    "Station Facilities",
    "Unauthorized Vendors & Hawkers",
    "Overcrowding & Passenger Safety",
    "Lost & Found Services",
    "AC & Fan Malfunctioning",
    "TTE & Railway Staff Misconduct",
  ];

  const transferMinistryOptions = [
    "Education",
    "Health & Family Welfare",
    "Road Transport",
    "Women & Child Development",
    "Consumer Affairs",
  ];

  useEffect(() => {
    const railwayComplaints = getAllComplaints().filter(
      (complaint) => complaint.ministry === "Railways"
    );
    setComplaints(railwayComplaints);
  }, []);

  const updateStatus = (id, newStatus) => {
    updateComplaintStatus(id, newStatus);
    const railwayComplaints = getAllComplaints().filter(
      (complaint) => complaint.ministry === "Railways"
    );
    setComplaints(railwayComplaints);
  };

  const saveComment = () => {
    if (!commentModalComplaint) return;
    updateComplaintComment(commentModalComplaint.id, commentDraft.trim());
    const railwayComplaints = getAllComplaints().filter(
      (item) => item.ministry === "Railways"
    );
    setComplaints(railwayComplaints);
    setCommentModalComplaint(null);
    setCommentDraft("");
  };

  const confirmDeleteComplaint = () => {
    if (!deleteModalComplaint) return;
    deleteComplaintById(deleteModalComplaint.id);
    const railwayComplaints = getAllComplaints().filter(
      (item) => item.ministry === "Railways"
    );
    setComplaints(railwayComplaints);
    setExpandedComplaintId((prev) =>
      prev === deleteModalComplaint.id ? null : prev
    );
    setDeleteModalComplaint(null);
  };

  const handleTransferComplaint = () => {
    if (!selectedTransferComplaintIds.length || !targetMinistry) return;
    transferComplaintsToMinistry(selectedTransferComplaintIds, targetMinistry);
    const railwayComplaints = getAllComplaints().filter(
      (item) => item.ministry === "Railways"
    );
    setComplaints(railwayComplaints);
    setExpandedComplaintId((prev) =>
      selectedTransferComplaintIds.includes(prev) ? null : prev
    );
    setSelectedTransferComplaintIds([]);
    setTargetMinistry("");
    setIsTransferMode(false);
  };

  const toggleTransferSelection = (complaintId, checked) => {
    setSelectedTransferComplaintIds((prev) =>
      checked ? [...prev, complaintId] : prev.filter((id) => id !== complaintId)
    );
  };

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "All" || c.status === statusFilter;
      const matchCategory =
        categoryFilter === "All" || c.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [complaints, search, statusFilter, categoryFilter]);

  const statusColor = (status) => {
    if (status === "Resolved") return "bg-green-500 text-white shadow-green-200";
    if (status === "Under Review")
      return "bg-yellow-500 text-white shadow-yellow-200";
    if (status === "Submitted") return "bg-blue-500 text-white shadow-blue-200";
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

  const toggleComplaintDetails = (complaintId) => {
    setExpandedComplaintId((prev) => (prev === complaintId ? null : complaintId));
  };

  const formatFieldLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  const isUrl = (value) =>
    typeof value === "string" && /^https?:\/\//i.test(value);
  const isImageUrl = (value) =>
    isUrl(value) && /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(value);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100">
      <div className="w-80 bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800 text-white shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-8">
          <FaTrain className="text-2xl text-yellow-300" />
          <h1 className="text-xl font-bold">Ministry of Railway</h1>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg mb-6">
          <FaSearch className="text-white/70" />
          <input
            className="bg-transparent w-full outline-none text-white placeholder-white/60"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h2 className="text-sm font-bold text-white/70 mb-2">STATUS</h2>

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

        <h2 className="text-sm font-bold text-white/70 mt-6 mb-2">CATEGORIES</h2>

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
                categoryFilter === cat ? "bg-pink-500 text-white" : "hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-extrabold text-gray-800">Railway Operations Dashboard</h1>
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
          <p className="text-gray-600">Monitor passenger complaints & resolution workflow</p>
        </div>

        <div className="grid gap-5">
          {filtered.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleComplaintDetails(c.id)}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-indigo-500 cursor-pointer"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{c.title}</h2>
                  <p className="text-gray-500 mt-1">{c.description}</p>
                  <div className="mt-3 text-sm text-indigo-600 font-semibold">{c.category}</div>
                  <div className="text-sm text-gray-400">PNR: {c.pnr || "-"}</div>
                  <div className="text-sm text-gray-400">Train: {c.trainNumber || "-"}</div>
                </div>

                <div className="text-right">
                  {isTransferMode && (
                    <div className="mb-3 flex justify-end">
                      <label className="inline-flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={selectedTransferComplaintIds.includes(c.id)}
                          onChange={(e) => toggleTransferSelection(c.id, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        Select
                      </label>
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-2 flex-wrap">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold ${statusColor(c.status)}`}
                    >
                      {c.status}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCommentModalComplaint(c);
                        setCommentDraft(c.ministryComment || "");
                      }}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-lg"
                    >
                      Comment
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModalComplaint(c);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-4">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="border p-2 rounded-lg text-sm shadow-md"
                    >
                      <option>Pending</option>
                      <option>Under Review</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs font-semibold text-indigo-600">
                {expandedComplaintId === c.id
                  ? "Click card to hide full details"
                  : "Click card to view full details"}
              </div>

              {expandedComplaintId === c.id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Complaint Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(c).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-slate-50 rounded-lg px-3 py-2 border border-slate-200"
                      >
                        <div className="text-xs font-semibold text-slate-500">
                          {formatFieldLabel(key)}
                        </div>
                        <div className="text-sm text-slate-800 break-words">
                          {value === null || value === undefined || value === "" ? (
                            "-"
                          ) : isImageUrl(value) ? (
                            <img
                              src={value}
                              alt={formatFieldLabel(key)}
                              className="mt-1 max-h-40 rounded-md border border-slate-200 object-contain bg-white"
                            />
                          ) : isUrl(value) ? (
                            <a
                              href={value}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View attachment
                            </a>
                          ) : (
                            String(value)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {!filtered.length && (
            <div className="bg-white rounded-2xl shadow p-6 text-gray-500">
              No railway complaints found.
            </div>
          )}
        </div>
      </div>

      {commentModalComplaint && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Add Comment</h3>
            <p className="text-sm text-gray-500 mb-4">
              {commentModalComplaint.title}
            </p>
            <textarea
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="Write ministry comment..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setCommentModalComplaint(null);
                  setCommentDraft("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveComment}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalComplaint && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Complaint</h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this complaint?
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-5">
              {deleteModalComplaint.title}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteModalComplaint(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteComplaint}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinistryofRailways;
