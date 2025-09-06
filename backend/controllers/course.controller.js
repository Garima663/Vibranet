import Course from "../models/LanguageCourses.js";

export async function createCourse(req,res) {
 
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
}


export async function getCourse(req,res) {
    try {
    const courses = await Course.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("Fetch courses error:", err);
    res.status(500).json({ message: "Server error" });
  }
}