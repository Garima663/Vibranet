import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import CourseInfo from "../components/CourseInfo";
import ChapterTopicList from "../components/ChapterTopicList";

function CourseLayout() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosInstance.get(`/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!course) return <p className="p-4">Course not found</p>;

  // return (
  //   <div className="p-6 max-w-4xl mx-auto">
  //     <h1 className="text-3xl font-bold">{course.language}</h1>
  //     <p className="text-gray-600 mt-2">{course.description}</p>

  //     <div className="mt-6">
  //       <h2 className="text-xl font-semibold">Chapters</h2>
  //       <ul className="mt-2 space-y-4">
  //         {course.courseJson?.chapters?.map((ch, i) => (
  //           <li key={i} className="border rounded p-4 bg-base-200">
  //             <h3 className="font-bold">{ch.chapterName}</h3>
  //             <p>Duration: {ch.duration}</p>
  //             <p>Topics: {ch.topics?.join(", ")}</p>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
<div className="bg-base-100 min-h-screen">
  <div className="m-8 p-4">
  <CourseInfo course={course}/>
  <ChapterTopicList course={course}/>
</div>
</div>
  );
}

export default CourseLayout;
