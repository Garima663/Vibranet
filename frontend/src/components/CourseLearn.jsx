
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function CourseLearn() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosInstance.get(`/courses/${id}`);
        setCourse(data);

        const firstChapter = data.courseContent?.[0];
        const firstTopic = firstChapter?.topics?.[0];
        setActiveChapter(firstChapter);
        setActiveTopic(firstTopic);
      } catch (error) {
        console.error("❌ Error fetching course:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p className="p-6">Loading course...</p>;
  if (!course) return <p className="p-6 text-red-500">Course not found.</p>;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-50 border-r overflow-y-auto p-4">
        <h2 className="text-lg font-bold mb-4">Chapters</h2>

        <ul className="space-y-4">
          {course.courseContent?.map((chapter, cIdx) => (
            <li key={cIdx}>
              <button
                onClick={() => {
                  setActiveChapter(chapter);
                  setActiveTopic(chapter.topics?.[0]);
                }}
                className={`w-full text-left font-semibold ${
                  activeChapter?.chapterName === chapter.chapterName
                    ? "text-green-600"
                    : "text-gray-800"
                }`}
              >
                {chapter.chapterName}
              </button>

              {/* Topics under this chapter */}
              {activeChapter?.chapterName === chapter.chapterName && (
                <ul className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3">
                  {chapter.topics.map((topicObj, tIdx) => (
                    <li key={tIdx}>
                      <button
                        onClick={() => setActiveTopic(topicObj)}
                        className={`text-sm ${
                          activeTopic?.topic === topicObj.topic
                            ? "text-green-600 font-medium"
                            : "text-gray-600 hover:text-green-500"
                        }`}
                      >
                        {topicObj.topic}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {course.courseJson?.name || course.language}
        </h1>
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{course.description}</p>
        <br></br>

        {activeChapter && activeTopic && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              {activeTopic.topic}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {activeTopic.content}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
