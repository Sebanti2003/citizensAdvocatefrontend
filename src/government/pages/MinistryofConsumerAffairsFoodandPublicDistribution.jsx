import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const FALLBACK_CATEGORIES = [
  "Defective or Fake Products",
  "Online Shopping Scams",
  "Delayed or Non-Delivery of Orders",
  "Misleading Advertisements",
  "Poor Customer Service & Refund Issues",
  "Price Hike & Overcharging",
  "Food Adulteration & Expired Products",
  "Warranty & Guarantee Violations",
  "Fraudulent Business Practices",
  "Electricity & Water Bill Complaints",
  "Telecom & Internet Service Issues",
];

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "addresed", label: "Resolved" },
  { value: "rejected", label: "Rejected/Reset" },
];

const statusLabelMap = {
  pending: "Pending",
  addresed: "Resolved",
  rejected: "Rejected/Reset",
};

function MinistryofConsumerAffairs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [complaintCategories, setComplaintCategories] = useState(
    FALLBACK_CATEGORIES
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({});
  const [savingById, setSavingById] = useState({});

  const fetchDepartmentalComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BACKEND_URL}/api/v1/complaints/eachDepartmentalComplaints`,
        { withCredentials: true }
      );

      const apiComplaints = response?.data?.complaints || [];
      const apiCategories = response?.data?.categories || [];

      setComplaints(apiComplaints);
      setComplaintCategories(
        apiCategories.length ? apiCategories : FALLBACK_CATEGORIES
      );

      const initialDrafts = {};
      apiComplaints.forEach((item) => {
        initialDrafts[item._id] = item.ministryComment || "";
      });
      setCommentDrafts(initialDrafts);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch complaints. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentalComplaints();
  }, []);

  const getComplaintTitle = (complaint) =>
    complaint.productname ||
    complaint.trainName ||
    complaint.institutionname ||
    complaint.hospitalname ||
    complaint.transportservicename ||
    complaint.issuetype ||
    complaint.category ||
    "Complaint";

  const getComplaintRef = (complaint) =>
    complaint.productid ||
    complaint.pnr ||
    complaint.trainNumber ||
    complaint.institutionid ||
    complaint.hospitalid ||
    complaint.transportservicenumber ||
    complaint.issuecode ||
    "N/A";

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const title = getComplaintTitle(c);
      const matchSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        (c.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.person || "").toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || c.status === statusFilter;

      const matchCategory =
        categoryFilter === "All" || c.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [complaints, search, statusFilter, categoryFilter]);

  const statusColor = (status) => {
    if (status === "addresed")
      return "bg-green-500 text-white shadow-green-200";
    if (status === "rejected")
      return "bg-yellow-500 text-white shadow-yellow-200";
    return "bg-red-500 text-white shadow-red-200";
  };

  const updateComplaint = async (complaintId, body) => {
    await axios.patch(
      `${BACKEND_URL}/api/v1/complaints/departmentalcomplaint/${complaintId}`,
      body,
      { withCredentials: true }
    );
  };

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      setSavingById((prev) => ({ ...prev, [complaintId]: true }));
      await updateComplaint(complaintId, {
        status: newStatus,
        ministryComment: commentDrafts[complaintId] || "",
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update complaint status."
      );
    } finally {
      setSavingById((prev) => ({ ...prev, [complaintId]: false }));
    }
  };

  const handleCommentSave = async (complaintId) => {
    try {
      setSavingById((prev) => ({ ...prev, [complaintId]: true }));
      await updateComplaint(complaintId, {
        ministryComment: commentDrafts[complaintId] || "",
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId
            ? { ...c, ministryComment: commentDrafts[complaintId] || "" }
            : c
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to save ministry comment."
      );
    } finally {
      setSavingById((prev) => ({ ...prev, [complaintId]: false }));
    }
  };

  const handleResetComplaint = async (complaintId) => {
    const ok = window.confirm(
      "Reset this complaint? This removes it from the ministry queue so the citizen can re-file an updated complaint."
    );
    if (!ok) return;

    try {
      setSavingById((prev) => ({ ...prev, [complaintId]: true }));
      await axios.delete(
        `${BACKEND_URL}/api/v1/complaints/departmentalcomplaint/${complaintId}/reset`,
        { withCredentials: true }
      );

      setComplaints((prev) => prev.filter((c) => c._id !== complaintId));
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to reset complaint."
      );
    } finally {
      setSavingById((prev) => ({ ...prev, [complaintId]: false }));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100">
      <div className="w-80 bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800 text-white shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingCart className="text-2xl text-yellow-300" />
          <h1 className="text-xl font-bold">
            Ministry of Consumer Affairs
          </h1>
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
        {["All", "pending", "addresed", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
              statusFilter === s
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-white/10"
            }`}
          >
            {s === "All" ? "All" : statusLabelMap[s]}
          </button>
        ))}

        <h2 className="text-sm font-bold text-white/70 mt-6 mb-2">
          CATEGORIES
        </h2>

        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
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

      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Consumer Affairs Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor consumer complaints & fraud reports
          </p>
          {error && (
            <p className="text-red-600 mt-2 text-sm">{error}</p>
          )}
        </div>

        {loading ? (
          <div className="text-gray-700 font-medium">
            Loading complaints...
          </div>
        ) : (
          <div className="grid gap-5">
            {filtered.map((c) => (
              <motion.div
                key={c._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-indigo-500"
              >
                <div className="flex justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {getComplaintTitle(c)}
                    </h2>

                    <p className="text-gray-500 mt-1">{c.description}</p>

                    <div className="mt-3 text-sm text-indigo-600 font-semibold">
                      {c.category}
                    </div>

                    <div className="text-sm text-gray-400">
                      Citizen: {c.person || "Unknown"}
                    </div>

                    <div className="text-sm text-gray-400">
                      Reference: {getComplaintRef(c)}
                    </div>

                    <div className="mt-4">
                      <textarea
                        value={commentDrafts[c._id] || ""}
                        onChange={(e) =>
                          setCommentDrafts((prev) => ({
                            ...prev,
                            [c._id]: e.target.value,
                          }))
                        }
                        placeholder="Add ministry comment..."
                        className="w-full border p-2 rounded-lg text-sm"
                        rows="3"
                      />

                      <button
                        onClick={() => handleCommentSave(c._id)}
                        disabled={!!savingById[c._id]}
                        className="mt-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
                      >
                        Save Comment
                      </button>
                    </div>
                  </div>

                  <div className="text-right min-w-[200px]">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold ${statusColor(
                        c.status
                      )}`}
                    >
                      {statusLabelMap[c.status] || c.status}
                    </span>

                    <div className="mt-4">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          handleStatusUpdate(c._id, e.target.value)
                        }
                        className="border p-2 rounded-lg text-sm shadow-md w-full"
                        disabled={!!savingById[c._id]}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => handleResetComplaint(c._id)}
                      disabled={!!savingById[c._id]}
                      className="mt-3 w-full px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      Reset Complaint
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {!filtered.length && (
              <div className="bg-white rounded-2xl shadow p-6 text-gray-600">
                No complaints found for current filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinistryofConsumerAffairs;
