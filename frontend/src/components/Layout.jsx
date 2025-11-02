import  Sidebar from './Sidebar'
import Navbar from './Navbar'
import React from 'react'

export default function Layout({children, showSidebar=false}) {
  return (
    <div className='min-h-screen bg-primary-content'>
      <div className='flex min-h-screen'>
       {showSidebar && <Sidebar/>}

       <div className='flex-1 flex flex-col'>
        <Navbar/>

        <main className='flex-1 overfolw-y-auto p-4'>
           {children}
        </main>
       </div>
      </div>
    </div>
  )
}
