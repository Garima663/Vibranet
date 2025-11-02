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

 
  return (
<div className="bg-base-100 min-h-screen">
  <div className="m-8 p-4">
  <CourseInfo course={course} setCourse = {setCourse}/>
  <ChapterTopicList course={course}/>
</div>
</div>
  );
}

export default CourseLayout;
