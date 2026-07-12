import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouteTransitionLoader } from '../../components/RouteTransitionLoader';

const departments = [
  { name: 'Ministry of Railways', id: 'RAIL001' },
  { name: 'Ministry of Consumer Affairs', id: 'CONSUMER002' },
  { name: 'Ministry of Home Affairs', id: 'HOME003' },
  { name: 'Ministry of Women and Child Safety', id: 'WOMEN004' },
  { name: 'Ministry of Road Transport and Highways', id: 'ROAD005' },
  { name: 'Ministry of Health and Family Welfare', id: 'HEALTH006' },
];

function GovtSign() {
  const navigate = useNavigate();
  const { showRouteLoader } = useRouteTransitionLoader();

  const [departmentalname, setDepartmentName] = useState('');
  const [departmentalid, setDepartmentId] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDepartmentChange = (e) => {
    const selectedName = e.target.value;
    setDepartmentName(selectedName);
    const match = departments.find((d) => d.name === selectedName);
    setDepartmentId(match ? match.id : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/ministry/auth/signup',
        {
          departmentalname,
          departmentalid,
          password,
        }
      );

      console.log(response.data);

      showRouteLoader('/govt/login');
      navigate('/govt/login');

      // Reset fields
      setDepartmentName('');
      setDepartmentId('');
      setPassword('');
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || 'Error signing up'
      );
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

        <h2 className="text-2xl font-bold text-center mb-4">
          Government Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <select
            value={departmentalname}
            onChange={handleDepartmentChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
            required
          >
            <option value="" disabled>
              Select Department Name
            </option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Department ID"
            value={departmentalid}
            readOnly
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            required
          />

          {/* Manual Password */}
          <input
            type="password"
            placeholder="Create Department Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded ${
              loading
                ? 'bg-gray-400'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {error && (
            <div className="text-red-600 mt-2 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default GovtSign;
