import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRouteTransitionLoader } from '../../components/RouteTransitionLoader';

const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

let ministrySessionCheckPromise = null;
const chakraSpokes = Array.from({ length: 24 }, (_, index) => index);

const getAxiosErrorMessage = (error) => {
  if (error?.response?.status === 503) {
    return 'Backend service is currently unavailable (503). Please wait a moment and try again.';
  }

  if (error?.response?.status === 401) {
    return error.response?.data?.message || 'Invalid department ID or password.';
  }

  if (error?.code === 'ERR_NETWORK') {
    return 'Cannot reach local backend. Make sure server is running at http://localhost:3000.';
  }

  return error?.response?.data?.message || 'Something went wrong. Please try again.';
};

function GovtLogin() {
  const [departmentalid, setDepartmentId] = useState('');
  const [password, setCreateDepartmentPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sessionChecking, setSessionChecking] = useState(true);
  const navigate = useNavigate();
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const { showRouteLoader } = useRouteTransitionLoader();


  useEffect(() => {
    const me = async () => {
      try {
        if (!ministrySessionCheckPromise) {
          ministrySessionCheckPromise = axios.get(
            `${BACKEND_URL}/api/v1/ministry/me`,
            { withCredentials: true }
          ).finally(() => {
            ministrySessionCheckPromise = null;
          });
        }

        const response = await ministrySessionCheckPromise;
        console.log(response.data);
      } catch (err) {
        console.error('Error checking ministry session:', err);
      } finally {
        setSessionChecking(false);
      }
    };
    me();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      console.log('Backend URL:', BACKEND_URL);
      const response = await axios.post(`${BACKEND_URL}/api/v1/ministry/auth/login`, {
        departmentalid,
        password
      }, {
        withCredentials: true
      });

      console.log(response.data);
      const depid = response.data.ministry.departmentalid;

      const departmentRoutes = {
        "RAIL001": "MinistryofRailways",
        "CONSUMER002": "MinistryofConsumerAffairs",
        "WOMEN004": "MinistryofWomenandChildDevelopment",
        "EDU003": "MinistryofEducation",
        "ROAD005": "MinistryofRoadTransportandHighways",
        "HEALTH006": "MinistryofHealthandFamilyWelfare",
      };

      if (departmentRoutes[depid]) {
        navigate(`/${departmentRoutes[depid]}/${depid}`);
      }

      setDepartmentId('');
      setCreateDepartmentPassword('');
    } catch (error) {
      console.error(error);
      setError(getAxiosErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get(`==> Exited with status 127
  ;
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  //   //fetchMessages(); // Call the function
  // }, []); // Run once when component mounts

  if (redirectToSignUp) {
    return <Navigate to="/govt/signup" />;
  }

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

        @keyframes chakraSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
            filter: 'blur(18px) saturate(1.02)',
            animation: 'powderDrift 20s ease-in-out infinite',
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
            filter: 'blur(34px)',
            animation: 'powderFloat 24s ease-in-out infinite',
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
            filter: 'blur(42px)',
            animation: 'powderFloat 16s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0 opacity-25 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '240px 240px',
            filter: 'contrast(140%) blur(0.4px)',
            animation: 'grainShift 10s linear infinite',
          }}
        />
        <div
          className="absolute inset-0 opacity-18"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 36%, transparent 64%)',
            }}
          />
        </div>

      <div className="relative w-96 rounded-2xl border border-white/35 bg-white/78 p-8 shadow-2xl backdrop-blur-md">
        {sessionChecking && (
          <div className="mb-4 flex items-center justify-center gap-3 rounded-xl bg-white/55 px-3 py-2 text-sm text-slate-600">
            <svg
              viewBox="0 0 100 100"
              className="h-6 w-6"
              style={{ animation: 'chakraSpin 1.4s linear infinite' }}
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="43" fill="none" stroke="#0f1ea8" strokeWidth="6" />
              {chakraSpokes.map((index) => {
                const angle = (index * 360) / chakraSpokes.length;

                return (
                  <line
                    key={index}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="12"
                    stroke="#0f1ea8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    transform={`rotate(${angle} 50 50)`}
                  />
                );
              })}
              <circle cx="50" cy="50" r="9" fill="#0f1ea8" />
            </svg>
            <span>Checking saved session...</span>
          </div>
        )}
        <h2 className="text-2xl font-bold text-center mb-4">Government Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Department ID"
            value={departmentalid}
            onChange={(e) => setDepartmentId(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Department Password"
            value={password}
            onChange={(e) => setCreateDepartmentPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Dont have an account?{' '}
          <span
            onClick={() => {
              showRouteLoader('/govt/signup');
              setRedirectToSignUp(true);
            }}
            className="text-green-500 cursor-pointer"
          >
            Sign up
          </span>
        </p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default GovtLogin;
