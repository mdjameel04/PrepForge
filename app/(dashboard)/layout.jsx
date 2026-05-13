import React from 'react'
import Sidebar from './_components/Sidebar'
import Topbar from './_components/Topbar'

const Dahboardlayout = ({children}) => {
  return (
    <div className='flex h-screen bg-background overflow-hidden'>
     <Sidebar/>
       <div className='flex flex-col flex-1 overflow-hidden'>
         <Topbar/>
         <main className='flex-1 overflow-y-auto p-6'>
        {children}
         </main>
       </div>
    </div>
  )
}

export default Dahboardlayout