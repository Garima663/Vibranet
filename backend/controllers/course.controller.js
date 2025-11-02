import Course from "../models/LanguageCourses.js";

import {
  GoogleGenAI,
} from '@google/genai';



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




export const generateCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      noOfChapter,
      includeVideo,
      level,
      category,
      userId,
    } = req.body;

    if (!name || !noOfChapter || !userId) {
      return res
        .status(400)
        .json({ error: "Language name, number of chapters, and userId are required" });
    }

    const prompt = `
      Generate language learning course depends on following details. In which make sure to add course name, description, chapter name, image prompt(create a modern, flat-style 2D digital illustration representing user topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user language course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean professional look. The illustration should feel creative, tech-savvy and educational, ideal for visualizing concepts in user language course for language course banner in 3D format, topic under each chapters, durations for each chapters etc, in JSON format only
      Schema:
      {
        "Course": {
          "name" : "string",
          "description": "string",
          "category": "string",
          "level": "string",
          "includeVideo": "boolean",
          "noOfChapters": "number",
          "chapters": [
            {
              "chapterName": "string",
              "duration": "string",
              "topics": ["string"],
              "imagePrompt": "string"
            }
          ]
        }
      }

      User Input:
      Language: ${name}
      Description: ${description || "N/A"}
      Chapters: ${noOfChapter}
      Include Video: ${includeVideo}
      Level: ${level || "N/A"}
      Category: ${category || "General"}
    `;

    const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ],
});

  let rawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text;

   if (!rawResp) {
  return res.status(500).json({ error: "Empty AI response" });
}


rawResp = rawResp.replace(/```json|```/g, "").trim();

    
    let jsonResp;
    
   try {
  jsonResp = JSON.parse(rawResp);
} catch (err) {
  console.error("AI raw response (invalid JSON):", rawResp);
  return res.status(500).json({
    error: "Failed to parse AI response",
    raw: rawResp,
  });
}


const courseJson = jsonResp.Course ? jsonResp.Course : jsonResp;

    // Save course in DB
    const newCourse = new Course({
  language: courseJson.name || name,
  description: courseJson.description || description || "",
  chapters: courseJson.noOfChapters || Number(noOfChapter),
  difficulty: courseJson.level || level || "",
  categories: courseJson.category
    ? courseJson.category.split(",").map((c) => c.trim())
    : category
    ? category.split(",").map((c) => c.trim())
    : [],
  includeVideo: courseJson.includeVideo ?? includeVideo ?? false,
  createdBy: userId,
  courseJson, // store full AI JSON
});

await newCourse.save();

    res.json({
      message: "Course generated successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error generating course:", error);
    res.status(500).json({ error: "Failed to generate course" });
  }
};
