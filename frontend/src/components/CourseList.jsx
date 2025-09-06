import React, { useState } from 'react'
import AddCourseDialogue from './AddCourseDialogue'

function CourseList() {
    const [CourseList, setCourseList] = useState([])
  return (
    <div className='m-8'>
      <h2 className='font-bold text-3xl mb-5'>Course List</h2>
      
      {CourseList?.length == 0 ? 
      <div className='flex p-7 items-center justify-center flex-col border rounded-xl'>
        <img src="/online-education.png" alt="edu" width={90} height={90}/>
      <h2 className='my-2 text-xl font-bold'>Looks like you haven't created any courses yet</h2>
      
      <AddCourseDialogue>
        <button className="btn btn-soft btn-primary m-4">+ Create your first course</button>
      </AddCourseDialogue>
      
      </div> : 
      <div>
        List of courses
        </div>}
    
    </div>
  )
}

export default CourseList
