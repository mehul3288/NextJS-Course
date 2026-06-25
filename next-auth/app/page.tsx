"use client"
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { authOptions } from './lib/auth'
import { redirect, useRouter } from 'next/navigation'

export default async function Home() {
  const router= useRouter()
  // const {data:session,status}=useSession()
  //if you don't want to make the component as server component you can use the getServerSession and then pass the authOptions to it
  const session=await getServerSession(authOptions)
  if(!session){
    redirect("/api/auth/signin")
  }
  //With client side component
  // useEffect(()=>{
  //   if(status==="unauthenticated"){
  //   router.push("/api/auth/signin")
  //   }
  // },[status,router])
  return (
    <div>{JSON.stringify(session)}</div>
  )
}
