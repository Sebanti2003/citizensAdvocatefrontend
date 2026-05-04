import { useState, useMemo } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

function MinistryofConsumerAffairs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // ✅ ONLY CATEGORY CHANGED
  const complaintCategories = [
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

  // ✅ ONLY DATA CHANGED
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Fake product delivered",
      description: "Received duplicate branded shoes from online store.",
      status: "Pending",
      category: "Defective or Fake Products",
      assignedTo: "Unassigned",
    },
    {
      id: 2,
      title: "Refund not processed",
      description: "Refund not received after order cancellation.",
      status: "Under Review",
      category: "Delayed or Non-Delivery of Orders",
      assignedTo: "Ravi Sharma",
    },
    {
      id: 3,
      title: "Overcharging issue",
      description: "Shop charged more than MRP for packaged goods.",
      status: "Resolved",
      category: "Price Hike & Overcharging",
      assignedTo: "Amit Verma",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
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

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100">

      {/* SIDEBAR */}
      <div className="w-80 bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800 text-white shadow-2xl p-6">

        {/* TITLE */}
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingCart className="text-2xl text-yellow-300" />
          <h1 className="text-xl font-bold">
            Ministry of Consumer Affairs
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

      {/* MAIN AREA */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Consumer Affairs Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor consumer complaints & fraud reports
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
                    Assigned: {c.assignedTo}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">

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

export default MinistryofConsumerAffairs;