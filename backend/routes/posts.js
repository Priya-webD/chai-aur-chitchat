import express from "express";
import Post from "../models/Post.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Get all posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a post (protected)
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      author: req.user.username,
      userId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a post (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;