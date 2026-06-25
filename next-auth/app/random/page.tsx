import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../lib/auth'
import { redirect } from 'next/navigation'

export default async function RandomPage() {
    const session=await getServerSession(authOptions)
    if(!session){
      redirect("/login")
    }
  return (
    <div>RandomPage</div>
  )
}
