"use client"
import React from 'react'

function Error({error}) {
  return (
    <main className='error'>
      <h1>An Error Occurred!</h1>
      <p>Failed to create the meal.</p>
    </main>
  )
}

export default Error