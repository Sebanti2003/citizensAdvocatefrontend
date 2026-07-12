import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  deleteComplaintById,
  getAllComplaints,
  subscribeToComplaints,
  updateComplaintComment,
  updateComplaintStatus,
} from "../../utils/complaintsStorage";

const departmentToConfig = {
  "Ministry of Railways": {
    slug: "railways",
    ministry: "Railways",
    title: "Railways Employee Dashboard",
    subtitle: "Review and monitor railway complaints assigned for government processing",
    categories: [
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
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100",
      sidebarBg: "bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800",
      userIcon: "text-blue-200",
      statusActive: "bg-yellow-400 text-black font-bold",
      categoryActive: "bg-pink-500 text-white",
      cardBorder: "border-indigo-500",
      categoryText: "text-indigo-600",
    },
  },
  "Ministry of Consumer Affairs": {
    slug: "consumer-affairs",
    ministry: "Consumer Affairs",
    title: "Consumer Affairs Employee Dashboard",
    subtitle: "Review and monitor consumer affairs complaints assigned for government processing",
    categories: [
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
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100",
      sidebarBg: "bg-gradient-to-b from-amber-900 via-orange-900 to-yellow-800",
      userIcon: "text-amber-200",
      statusActive: "bg-orange-300 text-black font-bold",
      categoryActive: "bg-amber-500 text-white",
      cardBorder: "border-amber-500",
      categoryText: "text-amber-700",
    },
  },
  "Ministry of Consumer Affairs, Food and Public Distribution": {
    slug: "consumer-affairs",
    ministry: "Consumer Affairs",
    title: "Consumer Affairs Employee Dashboard",
    subtitle: "Review and monitor consumer affairs complaints assigned for government processing",
    categories: [
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
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100",
      sidebarBg: "bg-gradient-to-b from-amber-900 via-orange-900 to-yellow-800",
      userIcon: "text-amber-200",
      statusActive: "bg-orange-300 text-black font-bold",
      categoryActive: "bg-amber-500 text-white",
      cardBorder: "border-amber-500",
      categoryText: "text-amber-700",
    },
  },
  "Ministry of Women and Child Development": {
    slug: "women-child-development",
    ministry: "Women & Child Development",
    title: "Women and Child Development Employee Dashboard",
    subtitle: "Review and monitor women and child development complaints assigned for government processing",
    categories: [
      "Domestic Violence & Abuse Complaints",
      "Child Labor & Exploitation",
      "Sexual Harassment & Workplace Safety",
      "Maternity & Childcare Facilities Issues",
      "Child Adoption & Foster Care Issues",
      "Women's Education & Employment Complaints",
      "Dowry & Forced Marriage Cases",
      "Cyber Harassment & Online Safety",
      "Malnutrition & Welfare Program Complaints",
      "Women's Shelter & Rehabilitation Complaints",
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50",
      sidebarBg: "bg-gradient-to-b from-pink-900 via-rose-900 to-red-800",
      userIcon: "text-pink-200",
      statusActive: "bg-rose-300 text-black font-bold",
      categoryActive: "bg-pink-500 text-white",
      cardBorder: "border-pink-500",
      categoryText: "text-pink-700",
    },
  },
  "Ministry of Health": {
    slug: "health-family-welfare",
    ministry: "Health & Family Welfare",
    title: "Health and Family Welfare Employee Dashboard",
    subtitle: "Review and monitor health and family welfare complaints assigned for government processing",
    categories: [
      "Hospital & Clinic Negligence",
      "Unavailability of Medicines & Vaccines",
      "Ambulance & Emergency Service Delays",
      "Overcharging by Private Hospitals",
      "Blood Bank & Organ Donation Issues",
      "Health Insurance Claims & Fraud",
      "Mental Health & Counselling Services",
      "Malpractice & Misconduct by Doctors",
      "Sanitation & Hygiene in Public Hospitals",
      "Medical Test & Lab Report Delays",
      "Lack of Facilities for Disabled Patients",
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
      sidebarBg: "bg-gradient-to-b from-emerald-900 via-teal-900 to-cyan-800",
      userIcon: "text-emerald-200",
      statusActive: "bg-emerald-300 text-black font-bold",
      categoryActive: "bg-emerald-500 text-white",
      cardBorder: "border-emerald-500",
      categoryText: "text-emerald-700",
    },
  },
  "Ministry of Health and Family Welfare": {
    slug: "health-family-welfare",
    ministry: "Health & Family Welfare",
    title: "Health and Family Welfare Employee Dashboard",
    subtitle: "Review and monitor health and family welfare complaints assigned for government processing",
    categories: [
      "Hospital & Clinic Negligence",
      "Unavailability of Medicines & Vaccines",
      "Ambulance & Emergency Service Delays",
      "Overcharging by Private Hospitals",
      "Blood Bank & Organ Donation Issues",
      "Health Insurance Claims & Fraud",
      "Mental Health & Counselling Services",
      "Malpractice & Misconduct by Doctors",
      "Sanitation & Hygiene in Public Hospitals",
      "Medical Test & Lab Report Delays",
      "Lack of Facilities for Disabled Patients",
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
      sidebarBg: "bg-gradient-to-b from-emerald-900 via-teal-900 to-cyan-800",
      userIcon: "text-emerald-200",
      statusActive: "bg-emerald-300 text-black font-bold",
      categoryActive: "bg-emerald-500 text-white",
      cardBorder: "border-emerald-500",
      categoryText: "text-emerald-700",
    },
  },
  "Ministry of Education": {
    slug: "education",
    ministry: "Education",
    title: "Education Employee Dashboard",
    subtitle: "Review and monitor education complaints assigned for government processing",
    categories: [
      "Admission Issues",
      "Exam & Result Issues",
      "Scholarship & Financial Aid",
      "Infrastructure & Facilities (Classrooms, Labs, Hostels)",
      "Faculty & Teaching Quality",
      "Harassment & Ragging Complaints",
      "Library & Resource Management",
      "Online Learning & Digital Access",
      "Student Grievance & Disciplinary Issues",
      "Transport & Commute Facilities",
      "Delay in Degree/Certificate Issuance",
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100",
      sidebarBg: "bg-gradient-to-b from-sky-900 via-blue-900 to-cyan-800",
      userIcon: "text-sky-200",
      statusActive: "bg-sky-300 text-black font-bold",
      categoryActive: "bg-blue-500 text-white",
      cardBorder: "border-blue-500",
      categoryText: "text-blue-700",
    },
  },
  "Ministry of Road Transport": {
    slug: "road-transport",
    ministry: "Road Transport",
    title: "Road Transport Employee Dashboard",
    subtitle: "Review and monitor road transport complaints assigned for government processing",
    categories: [
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
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200",
      sidebarBg: "bg-gradient-to-b from-slate-900 via-gray-900 to-zinc-800",
      userIcon: "text-slate-200",
      statusActive: "bg-slate-300 text-black font-bold",
      categoryActive: "bg-slate-600 text-white",
      cardBorder: "border-slate-500",
      categoryText: "text-slate-700",
    },
  },
  "Ministry of Road Transport and Highways": {
    slug: "road-transport",
    ministry: "Road Transport",
    title: "Road Transport Employee Dashboard",
    subtitle: "Review and monitor road transport complaints assigned for government processing",
    categories: [
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
    ],
    theme: {
      pageBg: "bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200",
      sidebarBg: "bg-gradient-to-b from-slate-900 via-gray-900 to-zinc-800",
      userIcon: "text-slate-200",
      statusActive: "bg-slate-300 text-black font-bold",
      categoryActive: "bg-slate-600 text-white",
      cardBorder: "border-slate-500",
      categoryText: "text-slate-700",
    },
  },
};

const slugToConfig = Object.values(departmentToConfig).reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});

const normalizeEmployeeId = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

function GovernmentEmployeeDashboard() {
  const navigate = useNavigate();
  const { ministrySlug } = useParams();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);
  const [commentModalComplaint, setCommentModalComplaint] = useState(null);
  const [deleteModalComplaint, setDeleteModalComplaint] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");

  const employeeName =
    localStorage.getItem("employeeName") || "Government Employee";
  const employeeDepartment =
    localStorage.getItem("employeeDepartment") || "";
  const employeeId = normalizeEmployeeId(localStorage.getItem("employeeId"));
  const departmentConfig = departmentToConfig[employeeDepartment];
  const routeConfig = ministrySlug ? slugToConfig[ministrySlug] : null;
  const activeConfig = routeConfig || departmentConfig || null;
  const targetMinistry = activeConfig?.ministry || "";
  const dashboardTitle = activeConfig?.title || "Government Employee Dashboard";
  const dashboardSubtitle =
    activeConfig?.subtitle ||
    "Review and monitor complaints assigned for government processing";
  const complaintCategories = activeConfig?.categories || [];
  const theme = activeConfig?.theme || {
    pageBg: "bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100",
    sidebarBg: "bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800",
    userIcon: "text-blue-200",
    statusActive: "bg-yellow-400 text-black font-bold",
    categoryActive: "bg-pink-500 text-white",
    cardBorder: "border-indigo-500",
    categoryText: "text-indigo-600",
  };

  useEffect(() => {
    const syncComplaints = () => {
      setComplaints(getAllComplaints());
    };

    syncComplaints();

    return subscribeToComplaints(syncComplaints);
  }, []);

  const handleStatusUpdate = (complaint, newStatus) => {
    updateComplaintStatus(complaint.id, newStatus);
  };

  const saveComment = () => {
    if (!commentModalComplaint) return;
    updateComplaintComment(commentModalComplaint.id, commentDraft.trim());
    setCommentModalComplaint(null);
    setCommentDraft("");
  };

  const confirmDeleteComplaint = () => {
    if (!deleteModalComplaint) return;
    deleteComplaintById(deleteModalComplaint.id);
    setExpandedComplaintId((prev) =>
      prev === deleteModalComplaint.id ? null : prev
    );
    setDeleteModalComplaint(null);
  };

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch =
        (c.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.description || "").toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || c.status === statusFilter;
      const matchCategory =
        categoryFilter === "All" || c.category === categoryFilter;
      const ministryMatch = !targetMinistry || c.ministry === targetMinistry;
      const assignedMatch =
        !!employeeId &&
        normalizeEmployeeId(c.assignedEmployeeId) === employeeId;
      return (
        matchSearch &&
        matchStatus &&
        matchCategory &&
        ministryMatch &&
        assignedMatch
      );
    });
  }, [complaints, search, statusFilter, categoryFilter, targetMinistry, employeeId]);

  const statusColor = (status) => {
    if (status === "Resolved")
      return "bg-green-500 text-white shadow-green-200";
    if (status === "Under Review")
      return "bg-yellow-500 text-white shadow-yellow-200";
    return "bg-red-500 text-white shadow-red-200";
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

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/ministry/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("employeeName");
      localStorage.removeItem("employeeDepartment");
      localStorage.removeItem("employeeId");
      navigate("/govt/employee/login");
    }
  };

  return (
    <div className={`min-h-screen flex ${theme.pageBg}`}>
      <div className={`w-80 ${theme.sidebarBg} text-white shadow-2xl p-6`}>
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className={`text-7xl ${theme.userIcon}`} />
          <h1 className="mt-3 text-xl font-bold">{employeeName}</h1>
          <p className="text-sm text-white/70">
            {employeeDepartment || "Government Employee"}
          </p>
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
                ? theme.statusActive
                : "hover:bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}

        <h2 className="text-sm font-bold text-white/70 mt-6 mb-2">CATEGORIES</h2>
        <div className="space-y-2">
          {complaintCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                categoryFilter === cat
                  ? theme.categoryActive
                  : "bg-white/10 hover:bg-white/20"
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
            <h1 className="text-4xl font-extrabold text-gray-800">
              {dashboardTitle}
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              Logout
            </button>
          </div>
          <p className="text-gray-600">
            {dashboardSubtitle}
          </p>
        </div>

        <div className="grid gap-5">
          {filtered.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleComplaintDetails(c.id)}
              className={`bg-white rounded-2xl shadow-lg p-6 border-l-8 ${theme.cardBorder}`}
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {c.title || "Complaint"}
                  </h2>
                  <p className="text-gray-500 mt-1">{c.description || "-"}</p>
                  <div className={`mt-3 text-sm font-semibold ${theme.categoryText}`}>
                    {c.category || "-"}
                  </div>
                  <div className="text-sm text-gray-400">
                    Ministry: {c.ministry || "-"}
                  </div>
                  <div className="text-sm text-gray-400">Date: {c.date || "-"}</div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 flex-wrap">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold ${statusColor(
                        c.status
                      )}`}
                    >
                      {c.status || "Pending"}
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
                      value={c.status || "Pending"}
                      onChange={(e) => handleStatusUpdate(c, e.target.value)}
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
              <div className={`mt-3 text-xs font-semibold ${theme.categoryText}`}>
                {expandedComplaintId === c.id
                  ? "Click card to hide full details"
                  : "Click card to view full details"}
              </div>
              {expandedComplaintId === c.id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">
                    Complaint Details
                  </h3>
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
                              onClick={(e) => e.stopPropagation()}
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
              {employeeId
                ? "No complaints transferred to this employee yet."
                : "No employee session found. Please log in again."}
            </div>
          )}
        </div>
      </div>

      {commentModalComplaint && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Add Comment</h3>
            <p className="text-sm text-gray-500 mb-4">{commentModalComplaint.title}</p>
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

export default GovernmentEmployeeDashboard;
