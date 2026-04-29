import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blog-backend-csv9.onrender.com/api/posts", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-400 text-lg">Please login to create a post.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-8 rounded-2xl shadow-2xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Write a Post</h2>
        <p className="text-gray-300 mb-6 text-sm">Share your thoughts with the world</p>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Post Title"
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Write your post content..."
          rows={7}
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Publish Post ✍️
        </button>
      </div>
    </div>
  );
}

export default CreatePost;