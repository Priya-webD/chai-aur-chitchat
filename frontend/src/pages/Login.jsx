import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://blog-backend-csv9.onrender.com/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-gray-300 mb-6 text-sm">Login to continue writing</p>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-300 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;