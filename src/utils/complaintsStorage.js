const STORAGE_KEY = "citizen_advocate_complaints_v1";

const seedComplaints = [
  {
    id: "R-1001",
    ministry: "Railways",
    title: "Dirty Train Washrooms",
    status: "Submitted",
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
  if (stored) return stored;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedComplaints));
  return seedComplaints;
};

export const saveAllComplaints = (complaints) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
};

export const addComplaint = (complaint) => {
  const all = getAllComplaints();
  const next = [complaint, ...all];
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
        }
      : c
  );
  saveAllComplaints(next);
  return next;
};
