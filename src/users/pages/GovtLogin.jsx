import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function GovtLogin() {
  const [departmentalid, setDepartmentId] = useState('');
  const [password, setCreateDepartmentPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);


  useEffect(() => {
    const me = async () => {
      try {
        const response = await axios.get(
          `https://citiadvo.onrender.com/api/v1/ministry/me`,
          { withCredentials: true }
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    me();
  }, [
    navigate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
      const response = await axios.post(`https://citiadvo.onrender.com/api/v1/ministry/auth/login`, {
        departmentalid,
        password
      }, {
        withCredentials: true
      });

      console.log(response.data);
      const depid = response.data.ministry.departmentalid;

      const departmentRoutes = {
        "RAIL001": "MinistryofRailways",
        "CONSUMER002": "MinistryofConsumerAffairsFoodandPublicDistribution",
        "WOMEN004": "MinistryofWomenandChildDevelopment",
        "EDU003": "MinistryofHomeAffairs",
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
      setError(error.response?.data?.message || 'Error logging in');
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
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
          Dont have an account?{' '}
          <span
            onClick={() => setRedirectToSignUp(true)}
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
