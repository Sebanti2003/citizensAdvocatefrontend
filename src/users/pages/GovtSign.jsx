import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
  { name: 'Railways', id: 'MOR-001' },
  { name: 'Road Transport', id: 'MORTH-002' },
  { name: 'Consumer Affairs', id: 'MOCAFPD-003' },
  { name: 'Health & Family Welfare', id: 'MOHFW-004' },
  { name: 'Women & Child Development', id: 'MOWCD-005' },
  { name: 'Education', id: 'MOE-006' },
];

function GovtSign() {
  const navigate = useNavigate();
  const [departmentalname, setDepartmentName] = useState('');
  const [departmentalid, setDepartmentId] = useState('');
  const [password, setCreateDepartmentPassword] = useState('');
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
      const response = await axios.post('http://localhost:3000/api/v1/ministry/auth/signup', {
        departmentalname,
        departmentalid,
        password
      });
      console.log(response.data);
     
      navigate('/govt/login');

 
      setDepartmentName('');
      setDepartmentId('');
      setCreateDepartmentPassword('');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Government Sign Up</h2>
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
          <input
            type="password"
            placeholder="Create Department Password"
            value={password}
            onChange={(e) => setCreateDepartmentPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <div className="text-red-600 mt-2 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default GovtSign;
