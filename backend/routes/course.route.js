// routes/course.route.js
import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js"; // same as your auth middleware
import { createCourse, getCourse } from "../controllers/course.controller.js";

const router = express.Router();

// ✅ Create course
router.post("/create", protectRoute, createCourse);

// ✅ Get my courses
router.get("/my-courses", protectRoute, getCourse);

export default router;
