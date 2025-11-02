// routes/course.route.js
import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js"; // same as your auth middleware
import {generateCourse} from "../controllers/course.controller.js";

const router = express.Router();

// ✅ Get my courses
// router.get("/my-courses", protectRoute, getCourse);

router.post("/generate-course", protectRoute, generateCourse)

export default router;
