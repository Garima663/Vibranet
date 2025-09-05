// pages/CoursesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState("");

  useEffect(() => {
  axios.get("/api/courses").then((res) => {
    console.log("API response:", res.data);
    setCourses(res.data.courses || []); // fallback to [] if undefined
  });
}, []);


  const createAI = async () => {
    if (!subject) return;
    const res = await axios.post("/api/courses/ai", { subject });
    setCourses([...courses, res.data]);
    setSubject("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Courses</h1>

      {/* AI Course Creator */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter subject for AI course"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={createAI}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Generate AI Course
        </button>
      </div>

      {/* Course List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="text-gray-600">{c.description}</p>
            <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
