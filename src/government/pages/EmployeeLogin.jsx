import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRouteTransitionLoader } from "../../components/RouteTransitionLoader";

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
  const { showRouteLoader } = useRouteTransitionLoader();

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f3ea] px-4 py-8">
      <style>{`
        @keyframes powderDrift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(1.5%, -1%, 0) scale(1.04);
          }
        }

        @keyframes powderFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-1.5%, 1.5%, 0) scale(1.05);
          }
        }

        @keyframes grainShift {
          0%,
          100% {
            opacity: 0.18;
            transform: translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.28;
            transform: translate3d(1%, -1%, 0);
          }
        }
      `}</style>
      <div className="absolute inset-0">
        <div
          className="absolute inset-[-8%]"
          style={{
            background: `
              radial-gradient(circle at 10% 10%, rgba(245,120,24,0.88) 0%, rgba(245,120,24,0.68) 12%, rgba(245,120,24,0.22) 24%, transparent 38%),
              radial-gradient(circle at 18% 20%, rgba(255,153,51,0.68) 0%, rgba(255,153,51,0.3) 10%, transparent 24%),
              radial-gradient(circle at 8% 82%, rgba(255,173,112,0.42) 0%, rgba(255,173,112,0.16) 14%, transparent 28%),
              radial-gradient(circle at 92% 18%, rgba(34,197,94,0.82) 0%, rgba(34,197,94,0.56) 14%, rgba(34,197,94,0.22) 28%, transparent 42%),
              radial-gradient(circle at 88% 46%, rgba(74,222,128,0.5) 0%, rgba(74,222,128,0.22) 12%, transparent 26%),
              radial-gradient(circle at 94% 86%, rgba(22,163,74,0.78) 0%, rgba(22,163,74,0.5) 16%, rgba(22,163,74,0.16) 30%, transparent 44%),
              radial-gradient(circle at 50% 48%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 26%, rgba(255,252,248,0.82) 40%, rgba(255,255,255,0.32) 56%, transparent 72%),
              linear-gradient(135deg, rgba(254,250,244,1), rgba(250,251,248,0.98), rgba(245,252,247,0.98))
            `,
            filter: "blur(18px) saturate(1.02)",
            animation: "powderDrift 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-[-6%] opacity-75"
          style={{
            background: `
              radial-gradient(circle at 12% 12%, rgba(244,114,28,0.38) 0 12%, transparent 28%),
              radial-gradient(circle at 16% 22%, rgba(249,115,22,0.24) 0 8%, transparent 22%),
              radial-gradient(circle at 90% 18%, rgba(34,197,94,0.34) 0 12%, transparent 28%),
              radial-gradient(circle at 86% 78%, rgba(22,163,74,0.3) 0 10%, transparent 26%),
              radial-gradient(circle at 8% 86%, rgba(251,146,60,0.18) 0 10%, transparent 24%)
            `,
            filter: "blur(34px)",
            animation: "powderFloat 24s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `
              radial-gradient(circle at 14% 14%, rgba(255,255,255,0.22) 0%, transparent 18%),
              radial-gradient(circle at 86% 18%, rgba(255,255,255,0.18) 0%, transparent 18%),
              radial-gradient(circle at 84% 80%, rgba(255,255,255,0.14) 0%, transparent 14%)
            `,
            filter: "blur(42px)",
            animation: "powderFloat 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-25 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "240px 240px",
            filter: "contrast(140%) blur(0.4px)",
            animation: "grainShift 10s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-18"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 36%, transparent 64%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-white/35 bg-white/78 p-8 shadow-2xl backdrop-blur-md">
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
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}

        <p className="text-sm text-center mt-5 text-gray-600">
          Not registered yet?{" "}
          <button
            type="button"
            onClick={() => {
              showRouteLoader("/govt/EmployeeRegistration");
              navigate("/govt/EmployeeRegistration");
            }}
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
