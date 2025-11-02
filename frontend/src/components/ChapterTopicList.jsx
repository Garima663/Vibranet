// import React from "react";
// import { Circle } from "lucide-react";

// function ChapterTopicList({ course }) {
//   const chapters = course?.courseJson?.chapters || [];

//   return (
//     <div className="mt-10">
//       <h2 className="font-bold text-3xl mb-8">Chapters & Topics</h2>
//       <div className="flex flex-col items-center justify-center mt-10">
//         {chapters.map((ch,index)=> (
//             <div key={index} className="flex flex-col items-center">
//               <div className="p-4 border shadow rounded-xl bg-primary text-white">
//                <h2 className="text-center">Chapter {index+1}</h2>
//                <h2 className="font-bold text-lg text-center">{ch.chapterName}</h2>
//                <h2 className="text-xs flex justify-between gap-16">
//                 <span>Duration: {ch?.duration}</span>
//                 <span>No. Of Chapters: {ch?.topics?.length}</span>
//                </h2>
//               </div>
//               <div>
//                 {ch?.topics.map((topic,index)=> (

//                 ))}
//               </div>
//             </div> 
//         ))}

//       </div>
//     </div>
//   );
// }

// export default ChapterTopicList





import React from "react";
import { Circle } from "lucide-react";

function ChapterTopicList({ course }) {
  return (
    <div className=" min-h-screen mt-10">
      <h2 className="font-bold text-3xl text-center">Chapters & Topics</h2>

      <div className="mt-10 flex flex-col items-center">
        {course?.courseJson?.chapters?.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="w-full flex flex-col items-center mb-16">
            {/* Chapter Box */}
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md text-center w-[400px]">
              <h3 className="text-xl font-semibold">
                Chapter {chapterIndex + 1}: {chapter.chapterName}
              </h3>
              <p className="text-sm mt-1">⏱ {chapter.duration}</p>
            </div>

            {/* Topics Timeline */}
            <div className="relative mt-8 w-full flex flex-col items-center">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 w-1 bg-gray-300" />

              {chapter.topics.map((topic, topicIndex) => {
                const isLeft = topicIndex % 2 === 0; // alternate left/right

                return (
                  <div key={topicIndex} className="relative flex items-center w-full my-6">
                    {/* Topic (left or right) */}
                    <div
                      className={`w-1/2 px-4 ${
                        isLeft ? "text-right pr-10" : "text-left pl-10 ml-auto"
                      }`}
                    >
                      <p className="text-gray-700 font-medium">{topic}</p>
                    </div>

                    {/* Circle in the center */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-purple-600 text-white rounded-full h-10 w-10 flex items-center justify-center shadow-md">
                      {topicIndex + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterTopicList;
