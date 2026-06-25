"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOut() {
     async function handleSignOut(){
      await signOut({ callbackUrl: '/your-custom-path' })
    }
    return (
        <form
            onSubmit={handleSignOut}
        >
            <button
                type="submit"
                className="w-full flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container hover:text-error rounded-lg transition-colors font-label-md text-label-md"
            >
                <span className="material-symbols-outlined text-[20px]">
                    logout
                </span>
                <span>Logout</span>
            </button>
        </form>
    )
}
