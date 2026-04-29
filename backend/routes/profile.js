import express from "express";
import User from "../models/User.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Get profile
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile
router.put("/", protect, async (req, res) => {
  const { username, about, profilePic } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { username, about, profilePic },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;