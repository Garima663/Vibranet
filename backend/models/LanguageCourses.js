// models/course.model.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    language: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      default: "" 
    },
    chapters: { 
      type: Number, 
      default: 0 
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", ""],
      default: "",
    },
    categories: { 
      type: [String], 
      default: [] 
    },
    includeVideo: { 
      type: Boolean, 
      default: false 
    },
      createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
