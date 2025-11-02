// routes/course.route.js
import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js"; // same as your auth middleware
import {generateCourse, getCourseById} from "../controllers/course.controller.js";

const router = express.Router();

// ✅ Get my courses
router.get("/:id", protectRoute, getCourseById);

router.post("/generate-course", protectRoute, generateCourse)

export default router;
