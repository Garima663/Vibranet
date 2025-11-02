// import CourseGenerator from "../components/CourseGenerator";

import CourseList from "../components/CourseList";

export default function CoursesPage() {
  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-4">Courses</h1>
    //   <CourseGenerator />
    // </div>

    <div className="">
      <div className="p-6 m-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-400
    rounded-xl">
     <h2 className="font-bold text-2xl text-white">Welcome to Language Learning Platform</h2>
     <p className="text-white">Learn, Create and Explore your favourite language courses</p>
    </div>
    <CourseList/>
    </div>
  );
}
