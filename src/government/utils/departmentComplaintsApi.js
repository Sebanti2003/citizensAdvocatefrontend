import axios from "axios";

const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const fetchDepartmentComplaints = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/api/v1/complaints/eachDepartmentalComplaints`,
    {
      withCredentials: true,
    }
  );

  return response?.data?.complaints || [];
};

export const updateDepartmentComplaint = async (
  complaintId,
  payload
) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/complaints/departmentalcomplaint/${complaintId}`,
    payload,
    {
      withCredentials: true,
    }
  );

  return response?.data?.complaint || null;
};

export const resetDepartmentComplaint = async (complaintId) => {
  await axios.delete(
    `${BACKEND_URL}/api/v1/complaints/departmentalcomplaint/${complaintId}/reset`,
    {
      withCredentials: true,
    }
  );
};

export { BACKEND_URL };
