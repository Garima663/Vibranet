import React from 'react'
import { Book, Clock, TrendingUp } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import useAuthUser from "../hooks/useAuthUser.js";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CourseInfo({course, setCourse}) {

   const { authUser } = useAuthUser();
  const userId = authUser?._id;
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleGenerateCourse = async () => {
    setLoading(true);
    try {
      const payload = {
        courseId: course._id,
        name: course.language,
        description: course.description,
        noOfChapter: course.chapters,
        level: course.difficulty,
        // includeVideo: course.includeVideo,
        category: course.categories?.join(","),
        userId,
      };

          console.log("📦 Sending payload:", payload);

      const { data } = await axiosInstance.post("/courses/generate-courseContent", payload);
      console.log("✅ Course generated (frontend):", data);
      setCourse(data.course);
      navigate("/courses");
    } catch (error) {
      console.error("Error generating course:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* m-8 p-4 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl'>{course?.courseJson?.name}</h2>
        <p className='line-clamp-2 text-gray-500 mb-3'>{course?.description}</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='flex gap-5 items-center p-3 rounded-lg shadow-xl'>
                <Clock className='text-blue-500'/>
                <section>
                    <h2 className='font-bold'>Duration</h2>
                    {/* to update later */}
                    <h2>2 Hours</h2> 
                </section>
            </div>
            <div className='flex gap-5 items-center p-3 rounded-lg shadow-xl'>
                <Book className='text-green-500'/>
                <section>
                    <h2 className='font-bold'>Chapters</h2>
                    {/* to update later */}
                    <h2>{course?.chapters}</h2> 
                </section>
            </div>
            <div className='flex gap-5 items-center p-3 rounded-lg shadow-xl'>
                <TrendingUp className='text-red-500'/>
                <section>
                    <h2 className='font-bold'>Difficulty Level</h2>
                    {/* to update later */}
                    <h2>{course?.difficulty}</h2> 
                </section>
            </div>
        </div>
        <button className="btn btn-soft btn-primary mt-2"
         onClick={handleGenerateCourse}
          disabled={loading}>
            {loading ? "Generating..." : "Generate Course"}
            </button>
      </div>
    </div>
  )
}

export default CourseInfo
