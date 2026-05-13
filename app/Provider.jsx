"use client"

import { ThemeProvider } from '@/components/theme-provider'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React, { useEffect } from 'react'

const Provider = ({children}) => {
const {user,isLoaded} = useUser()
  const createUser = useMutation(api.user.createNewUser)
// save user data in db 
 const CreateNewUser= async ()=>{
  if(!user) return

 try {
    await createUser({
      userName: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      imageUrl: user?.imageUrl || "",
      clerkId: user?.id || "",
        })
 } catch (error) {
  console.log("Error creating User")
 }
 };

 useEffect(()=>{
  if(user && isLoaded) {
    CreateNewUser()
  }
 },[user?.id, isLoaded])
  return (
    <div>
  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      { children}
      </ThemeProvider>
      </div>
  )
}

export default Provider