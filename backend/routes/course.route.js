// routes/course.route.js
import express from "express";
import Course from "../models/course.model.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // same as your auth middleware

const router = express.Router();

// ✅ Create course
router.post("/create", protectRoute, async (req, res) => {
  try {
    const { language, description, chapters, difficulty, categories, includeVideo } = req.body;

    const course = new Course({
      language,
      description,
      chapters,
      difficulty,
      categories: Array.isArray(categories) ? categories : (categories || "").split(","),
      includeVideo,
      createdBy: req.user._id,
    });

    await course.save();
    res.status(201).json({ success: true, course });
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get my courses
router.get("/my-courses", protectRoute, async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("Fetch courses error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
