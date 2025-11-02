import { useState } from "react";

export default function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setCourse(null);

    try {
      const res = await fetch("http://localhost:5000/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">AI Course Generator</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a topic (e.g., Machine Learning)"
          className="border p-2 flex-grow rounded"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {course && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">
            {course.courseTitle || "Generated Roadmap"}
          </h3>
          {course.modules ? (
            <ul className="space-y-2">
              {course.modules.map((mod, idx) => (
                <li key={idx} className="p-2 border rounded">
                  <h4 className="font-bold">{mod.title}</h4>
                  <p>{mod.description}</p>
                  {mod.resources && (
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {mod.resources.map((res, i) => (
                        <li key={i}>{res}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <pre>{JSON.stringify(course, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
