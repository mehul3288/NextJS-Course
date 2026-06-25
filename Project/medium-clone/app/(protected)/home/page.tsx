"use client"
// import { getServerSession } from 'next-auth';
// import React from 'react';
// import { authOptions } from '@/lib/auth';
// import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function HomePage() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect('/login');
  // }
  // console.log(session);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="text-gray-600 mt-2">Welcome to the Home page.</p>
      <button onClick={() => signOut({ callbackUrl: '/login' })} className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg'>Logout</button>
    </div>
  );
}