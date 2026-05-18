"use client"

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Bell } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const routeLabels= {
    "/dashboard": "Dashboard",
  "/topics": "Topics",
  "/learn": "Learn Mode",
  "/practice": "Practice",
  "/feedback": "AI Feedback",
  "/history": "History",
  "/settings": "Settings",
  }

const Topbar = () => {
const pathname = usePathname()

const getLabel =()=>{
   if (routeLabels[pathname]) return routeLabels[pathname];
  
   const base = "/" + pathname.split("/")[1]
    return routeLabels[base] || "PrepForge";
}
  return (
    <header className='flex items-center h-[60px] border-b border-border bg-background justify-between px-6 '>
    <div className='flex items-center gap-2 text-sm'>
         <span className="text-muted-foreground">PrepForge</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground"> {getLabel()} </span>
    </div>
 
    <div className='flex items-center gap-4'>
       <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>     
    </header>
  )
}

export default Topbar