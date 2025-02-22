import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function UserSign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState(""); // ✅ Added password state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/auth/signup", {
        name,
        email,
        phonenumber: phone,
        state,
        password, // ✅ Added password in the request body
      });

      console.log(response.data);
      setMessage("Signup successful! ✅");
      setName("");
      setEmail("");
      setPhone("");
      setState("");
      setPassword(""); // ✅ Reset password field

      navigate("/user/login");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Error signing up ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password" // ✅ Changed to password input type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // ✅ Corrected onChange handler
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 text-white rounded ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {error && <div className="text-red-600 mt-2 text-center">{error}</div>}
          {message && <div className="text-green-600 mt-2 text-center">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default UserSign;
