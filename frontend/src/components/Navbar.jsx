import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchPic = async () => {
      try {
        const res = await axios.get("https://blog-backend-csv9.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfilePic(res.data.profilePic || "");
      } catch (err) {}
    };
    fetchPic();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black bg-opacity-60 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-white border-opacity-10">
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        ✍️ SimpleBlog
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/profile" className="flex items-center gap-2 hover:text-indigo-300 transition text-sm">
              {profilePic ? (
                <img src={profilePic} alt="pic" className="w-8 h-8 rounded-full object-cover border-2 border-indigo-400" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm">
                  👤
                </div>
              )}
              <span>{user.username}</span>
            </Link>
            <Link to="/create" className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full text-sm transition">
              + New Post
            </Link>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-300 transition text-sm">Login</Link>
            <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full text-sm transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;