// routes/course.route.js
import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js"; // same as your auth middleware
import {generateCourse, generateCourseContent, getCourseById, getMyCourses} from "../controllers/course.controller.js";

const router = express.Router();

// ✅ Get my courses
router.get("/:id", protectRoute, getCourseById);

router.post("/generate-course", protectRoute, generateCourse)

router.post("/generate-courseContent", protectRoute, generateCourseContent);

router.get("/", protectRoute, getMyCourses);

export default router;
