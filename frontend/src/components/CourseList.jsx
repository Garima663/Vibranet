
import React, { useEffect, useState } from "react";
import AddCourseDialogue from "./AddCourseDialogue";
import { axiosInstance } from "../lib/axios";
import CourseCard from "./CourseCard"; // ✅ import component

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/courses");
      setCourseList(data);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <p className="m-8">Loading courses...</p>;
  }

  return (
    <div className="m-8">
      <h2 className="font-bold text-3xl mb-5">Course List</h2>

      <AddCourseDialogue>
            <button className="btn btn-soft btn-primary m-4">
              + Create course
            </button>
          </AddCourseDialogue>

      {courseList?.length === 0 ? (
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl">
          <img src="/online-education.png" alt="edu" width={90} height={90} />
          <h2 className="my-2 text-xl font-bold">
            Looks like you haven't created any courses yet
          </h2>

          <AddCourseDialogue>
            <button className="btn btn-soft btn-primary m-4">
              + Create your first course
            </button>
          </AddCourseDialogue>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseList.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
