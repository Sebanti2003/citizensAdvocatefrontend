import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useRouteTransitionLoader } from '../../components/RouteTransitionLoader';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showRouteLoader } = useRouteTransitionLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/auth/login', {
        email,
        password,
      }, {
        withCredentials: true
      });
      console.log('Login successful:', response.data);

      const loggedInUser =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.data?.data ||
        {};

      const displayName =
        loggedInUser?.username ||
        loggedInUser?.name ||
        loggedInUser?.fullName ||
        "";

      if (displayName) {
        localStorage.setItem("citizenUsername", displayName);
      }
      if (loggedInUser?._id) {
        localStorage.setItem("citizenUserId", loggedInUser._id);
      }
      if (loggedInUser?.email) {
        localStorage.setItem("citizenEmail", loggedInUser.email);
      }

      navigate('/user/citizendashboard'); // Redirecting to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
      setError(error.response?.data?.message || 'Invalid credentials ❌');
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

      <div className="relative w-96 rounded-2xl border border-white/35 bg-white/78 p-8 shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-4">User Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link
            to="/user/signup"
            className="text-blue-500 hover:underline"
            onClick={() => showRouteLoader('/user/signup')}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;

