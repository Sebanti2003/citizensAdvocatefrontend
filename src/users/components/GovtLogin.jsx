import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router';

function GovtLogin() {
  const [departmentalid, setDepartmentId] = useState('');
  const [password, setCreateDepartmentPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/ministry/auth/login', {
        departmentalid,
        password
      });
      console.log(response.data);
      navigate(`/MinistryofRailways/${response.data.ministry.departmentalid}`);
      setDepartmentId('');
      setCreateDepartmentPassword('');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error loging in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    setRedirectToSignUp(true);
  };

  if (redirectToSignUp) {
    return <Navigate to="/govt/signup" />;
  }
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Doesn&apos;t have an account?{' '}
          <span
            onClick={handleSignUpClick}
            className="text-green-500 cursor-pointer"
          >
            Sign up
          </span>
        </p>
        <div>{error && <p className="text-red-500 mt-4">{error}</p>}</div>
      </div>
    </div>
  );
}

export default GovtLogin;
