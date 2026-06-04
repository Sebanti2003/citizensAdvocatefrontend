import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const departmentToDashboardSlug = {
  "Ministry of Railways": "railways",
  "Ministry of Consumer Affairs": "consumer-affairs",
  "Ministry of Women and Child Development": "women-child-development",
  "Ministry of Health": "health-family-welfare",
  "Ministry of Education": "education",
  "Ministry of Road Transport": "road-transport",
};

const normalizeEmployeeId = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

function EmployeeLogin() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = (
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/employees/login`, {
        employeeId,
        password,
      });

      const employee = response?.data?.employee;
      if (!employee) {
        setError("Invalid employee credentials.");
        return;
      }

      localStorage.setItem("employeeName", employee.name);
      localStorage.setItem("employeeDepartment", employee.department);
      localStorage.setItem(
        "employeeId",
        normalizeEmployeeId(employee.employeeId)
      );
      const dashboardSlug = departmentToDashboardSlug[employee.department];
      navigate(
        dashboardSlug
          ? `/govt/employee/dashboard/${dashboardSlug}`
          : "/govt/employee/dashboard"
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Employee login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Employee Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}

        <p className="text-sm text-center mt-5 text-gray-600">
          Not registered yet?{" "}
          <button
            type="button"
            onClick={() => navigate("/govt/EmployeeRegistration")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default EmployeeLogin;
