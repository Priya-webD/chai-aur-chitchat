import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about:    { type: String, default: "" },
  profilePic: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);