

// import React from "react";
// import { LANGUAGE_TO_FLAG } from "../constants";

// function CourseCard({ course }) {
//   return (
//     <div className="w-80 bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
//       {/* Banner Section */}
//       <div className="w-full h-16 flex items-center justify-center bg-gray-50">
//         {getLanguageFlag(course.language) || (
//           <span className="text-gray-400 text-sm">No Flag</span>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="font-bold text-lg text-gray-800">{course.courseJson.name}</h3>

//         <p className="text-gray-600 text-sm line-clamp-2 mt-1 flex-grow">
//           {course.description}
//         </p>

//         <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
//           <span>📚 {course.chapters} Chapters</span>
//           <span className="px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-700">
//             {course.difficulty || "Beginner"}
//           </span>
//         </div>
//         <br></br>

//         {/* Button - aligned at bottom */}
//         <button className="mt-auto w-full py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition">
//           Start Learning
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseCard;



// export function getLanguageFlag(language) {
//   if (!language) return null;

//   const langLower = language.toLowerCase();
//   const countryCode = LANGUAGE_TO_FLAG[langLower];

//   if (countryCode) {
//     return (
//       <img
//         src={`https://flagcdn.com/24x18/${countryCode}.png`}
//         alt={`${langLower} flag`}
//         className="h-10"
//       />
//     );
//   }
//   return null;
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate(`/courses/${course._id}`);
  };

  const handleStartLearningClick = () => {
    navigate(`/courses/${course._id}/learn`);
  };

  return (
    <div className="w-80 bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Banner Section */}
      <div className="w-full h-16 flex items-center justify-center bg-gray-50">
        {getLanguageFlag(course.language) || (
          <span className="text-gray-400 text-sm">No Flag</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800">
          {course.courseJson?.name || course.language}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mt-1 flex-grow">
          {course.description}
        </p>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>📚 {course.chapters} Chapters</span>
          <span className="px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-700">
            {course.difficulty || "Beginner"}
          </span>
        </div>
        <br />

        {/* Conditional Button */}
        {course.courseContent && Object.keys(course.courseContent).length > 0 ? (
          <button
            className="mt-auto w-full py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
            onClick={handleStartLearningClick}
          >
            Start Learning
          </button>
        ) : (
          <button
            className="mt-auto w-full py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
            onClick={handleGenerateClick}
          >
            Generate Course
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/48x36/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-10"
      />
    );
  }
  return null;
}
