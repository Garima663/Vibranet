// models/Course.js
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  videoUrl: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessons: [lessonSchema],
  aiGenerated: { type: Boolean, default: false }
});

export default mongoose.model("Course", courseSchema);
