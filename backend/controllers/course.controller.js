import Course from "../models/LanguageCourses.js";

import {
  GoogleGenAI,
} from '@google/genai';



export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).populate("createdBy", "name email");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};



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

// "bannerImagePrompt": "string",

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


  // --- Generate banner image using Hugging Face ---
  //  let bannerImageUrl = "";
  //   try {
  //     const hfResponse = await fetch(
  //       "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           inputs: courseJson.bannerImagePrompt || `banner image for ${courseJson.name}`,
  //         }),
  //       }
  //     );

  //     if (!hfResponse.ok) {
  //       console.error("Hugging Face API error:", await hfResponse.text());
  //     } else {
  //       const arrayBuffer = await hfResponse.arrayBuffer();
  //       const base64Image = Buffer.from(arrayBuffer).toString("base64");

  //       // ✅ Upload somewhere or serve from backend
  //       bannerImageUrl = `data:image/png;base64,${base64Image}`;
  //     }
  //   } catch (err) {
  //     console.error("Error generating banner image:", err);
  //   }

    // Save course in DB
    const newCourse = new Course({
  language: name,
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
  // bannerImageUrl,
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







export const generateCourseContent = async (req, res) => {
  console.log("📥 Incoming request body:", req.body);

  try {
    const { courseId, name, description, noOfChapter, level, includeVideo, category, userId } = req.body;

    if (!name || !noOfChapter || !userId) {
      return res.status(400).json({
        error: "Language name, number of chapters, and userId are required",
      });
    }

        if (!courseId) {
      return res.status(400).json({ error: "courseId is required to update course content" });
    }

    const prompt = `
    Generate a course on ${name}.
    Return only valid JSON strictly following this schema:

    {
      "courseContent": [
        {
          "chapterName": "<chapter name>",
          "topics": [
            {
              "topic": "<topic name>",
              "content": "<detailed explanation>"
            }
          ]
        }
      ]
    }
    the content should be detailed with examples.

    User Input:
    Language: ${name}
    Description: ${description || "Not provided"}
    Number of Chapters: ${noOfChapter}
    Difficulty Level: ${level || "Not provided"}
    Include Video: ${includeVideo}
    Category: ${category || "Not provided"}
    `;

     console.log("📝 Prompt sent to AI:", prompt);


      const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log("🤖 Raw AI response object:", JSON.stringify(response, null, 2));

    let rawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawResp) {
      console.log("❌ Empty AI response");
      return res.status(500).json({ error: "Empty AI response" });
    }
    console.log("📄 Raw AI text response:", rawResp);

    rawResp = rawResp.replace(/```json|```/g, "").trim();

     let jsonResp;
    try {
      jsonResp = JSON.parse(rawResp);
      console.log("✅ Parsed JSON response:", JSON.stringify(jsonResp, null, 2));
    } catch (err) {
      console.error("❌ Failed to parse AI response:", rawResp);
      return res.status(500).json({
        error: "Failed to parse AI response",
        raw: rawResp,
      });
    }

 const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          courseContent: jsonResp.courseContent || [],
        },
      },
      { new: true } // return updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("💾 Updated course content:", updatedCourse.courseContent);

    res.json({
      message: "Course content generated and saved successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error generating course content:", error);
    res.status(500).json({ error: "Failed to generate course content" });
  }
};


export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id; // comes from protectRoute
    const courses = await Course.find({ createdBy: userId })
      .sort({ createdAt: -1 }); // latest first
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};
