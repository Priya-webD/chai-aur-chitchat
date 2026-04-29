import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      alert("Could not delete post");
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-white text-xl animate-pulse">Loading posts...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
          Welcome to SimpleBlog
        </h1>
        <p className="text-gray-300 text-lg">Stories, ideas and thoughts from our community</p>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No posts yet. Be the first to write one!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-6 mb-6 shadow-xl hover:bg-opacity-20 transition"
          >
            <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-gray-300 leading-relaxed">{post.content}</p>
            <div className="flex justify-between items-center mt-5">
              <span className="text-indigo-300 text-sm font-medium">✍️ {post.author}</span>
              <span className="text-gray-400 text-xs">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </span>
            </div>
            {user && user.username === post.author && (
              <button
                onClick={() => handleDelete(post._id)}
                className="mt-4 text-sm text-red-400 hover:text-red-300 transition"
              >
                🗑 Delete Post
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;