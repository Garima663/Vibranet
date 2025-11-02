// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { axiosInstance } from "../lib/axios";

// export default function CourseLearn() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/courses/${id}`);
//         setCourse(data);
//       } catch (error) {
//         console.error("❌ Error fetching course:", error.response?.data || error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   if (loading) {
//     return <p className="p-6">Loading course...</p>;
//   }

//   if (!course) {
//     return <p className="p-6 text-red-500">Course not found.</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">{course.courseJson?.name || course.language}</h1>
//       <p className="text-gray-600 mt-2">{course.description}</p>

//       {/* Chapters */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-3">Chapters</h2>
//         <ul className="space-y-3">
//           {course.courseJson?.chapters?.map((chapter, idx) => (
//             <li
//               key={idx}
//               className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="font-bold">{chapter.chapterName}</h3>
//               <p className="text-sm text-gray-600">⏱ {chapter.duration}</p>
//               <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
//                 {chapter.topics.map((topic, tIdx) => (
//                   <li key={tIdx}>{topic}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }




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
        <h1 className="text-3xl font-bold mb-3">
          {course.courseJson?.name || course.language}
        </h1>
        <p className="text-gray-600 mb-8">{course.description}</p>

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
