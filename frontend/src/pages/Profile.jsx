import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", about: "", profilePic: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setForm({
          username: res.data.username || "",
          about: res.data.about || "",
          profilePic: res.data.profilePic || "",
        });
      } catch (err) {
        setError("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      login({ ...user, username: res.data.username });
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-8 rounded-2xl shadow-2xl w-full max-w-lg">

     {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-white bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 px-4 py-2 rounded-full transition mb-6"
        >
          Back
        </button>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          {form.profilePic ? (
            <img
              src={form.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-400 mb-3"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-4xl mb-3">
              👤
            </div>
          )}
          <h2 className="text-2xl font-bold text-white">{form.username}</h2>
        </div>

        {success && <p className="text-green-400 text-sm mb-4 text-center">{success}</p>}
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <label className="text-gray-300 text-sm mb-1 block">Username</label>
        <input
          type="text"
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label className="text-gray-300 text-sm mb-1 block">About Me</label>
        <textarea
          rows={3}
          placeholder="Tell us about yourself..."
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />

        <label className="text-gray-300 text-sm mb-1 block">Profile Picture URL</label>
        <input
          type="text"
          placeholder="https://example.com/your-photo.jpg"
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.profilePic}
          onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
        />

        <button
          onClick={handleSave}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;