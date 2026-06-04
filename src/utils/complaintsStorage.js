const STORAGE_KEY = "citizen_advocate_complaints_v1";
const STORAGE_EVENT = "citizen-advocate-complaints-updated";
const normalizeEmployeeId = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";
const normalizeComplaintStatus = (value) =>
  value === "Submitted" ? "Pending" : value;
const normalizeComplaint = (complaint) => ({
  ...complaint,
  status: normalizeComplaintStatus(complaint?.status || "Pending"),
});

const seedComplaints = [
  {
    id: "R-1001",
    ministry: "Railways",
    title: "Dirty Train Washrooms",
    status: "Pending",
    date: "2026-05-01",
    category: "Train Cleanliness & Hygiene",
    description: "Washrooms were not cleaned properly during the journey.",
    trainNumber: "222",
    trainName: "Howrah-Puri Rajdhani Express",
    pnr: "8456123789",
    source: "seed",
    createdAt: "2026-05-01T10:00:00.000Z",
  },
];

const parseComplaints = (raw) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const getAllComplaints = () => {
  const stored = parseComplaints(localStorage.getItem(STORAGE_KEY));
  if (stored) {
    const normalized = stored.map(normalizeComplaint);
    const wasChanged = normalized.some(
      (complaint, index) => complaint.status !== stored[index]?.status
    );
    if (wasChanged) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedComplaints));
  return seedComplaints;
};

export const saveAllComplaints = (complaints) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
};

export const subscribeToComplaints = (callback) => {
  const handleChange = () => {
    callback(getAllComplaints());
  };

  const handleStorage = (event) => {
    if (event.key && event.key !== STORAGE_KEY) return;
    handleChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
};

export const addComplaint = (complaint) => {
  const all = getAllComplaints();
  const next = [normalizeComplaint(complaint), ...all];
  saveAllComplaints(next);
  return next;
};

export const updateComplaintStatus = (id, status) => {
  const all = getAllComplaints();
  const next = all.map((c) => (c.id === id ? { ...c, status } : c));
  saveAllComplaints(next);
  return next;
};

export const updateComplaintComment = (id, ministryComment) => {
  const all = getAllComplaints();
  const next = all.map((c) =>
    c.id === id ? { ...c, ministryComment } : c
  );
  saveAllComplaints(next);
  return next;
};

export const deleteComplaintById = (id) => {
  const all = getAllComplaints();
  const next = all.filter((c) => c.id !== id);
  saveAllComplaints(next);
  return next;
};

export const transferComplaintToMinistry = (id, ministry) => {
  const all = getAllComplaints();
  const next = all.map((c) =>
    c.id === id
      ? {
          ...c,
          ministry,
          status: "Pending",
          assignedTo: "",
          assignedEmployeeId: "",
        }
      : c
  );
  saveAllComplaints(next);
  return next;
};

export const transferComplaintsToMinistry = (ids, ministry) => {
  const idSet = new Set(ids);
  const all = getAllComplaints();
  const next = all.map((c) =>
    idSet.has(c.id)
      ? {
          ...c,
          ministry,
          status: "Pending",
          assignedTo: "",
          assignedEmployeeId: "",
        }
      : c
  );
  saveAllComplaints(next);
  return next;
};

export const assignComplaintsToEmployee = (ids, employee) => {
  const idSet = new Set(ids);
  const all = getAllComplaints();
  const next = all.map((c) =>
    idSet.has(c.id)
      ? {
          ...c,
          assignedTo: employee?.name || "",
          assignedEmployeeId: normalizeEmployeeId(employee?.employeeId),
        }
      : c
  );
  saveAllComplaints(next);
  return next;
};
