"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signInWithEmailAction } from "@/actions/auth.actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signInWithEmailAction, {
    error: null as string | null,
    typedInfo: null as { email: string } | null,
  });

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-[#006e05]/5 rounded-full blur-[120px] -top-1/4 -right-1/4" />
        <div className="absolute w-[500px] h-[500px] bg-[#5f5e5e]/5 rounded-full blur-[100px] -bottom-1/4 -left-1/4" />
      </div>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 z-10">
        <div className="w-full max-w-[440px] bg-white rounded-lg border border-[#becab6]/40 p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">

          {/* Brand header */}
          <div className="text-center mb-10">
            <h1 className="font-['Source_Serif_4'] text-[32px] md:text-[48px] leading-tight font-bold tracking-tight text-[#1a1c1c] mb-2">
              Medium
            </h1>
            <p className="text-[16px] font-medium text-[#5f5e5e]">
              Welcome back to the sanctuary.
            </p>
          </div>

          {/* Error */}
          {state?.error && (
            <div className="mb-6 px-4 py-3 bg-[#ffdad6] text-[#93000a] rounded-lg text-sm font-medium">
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-6">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                defaultValue={state?.typedInfo?.email}
                className="w-full bg-transparent border-0 border-b border-[#becab6] focus:border-[#006e05] focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-0 border-b border-[#becab6] focus:border-[#006e05] focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 pr-10 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#5f5e5e] hover:text-[#006e05] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-[13px] text-[#5f5e5e] hover:text-[#006e05] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-[#1a8917] text-white font-medium text-[16px] rounded-full hover:bg-[#006e05] active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-[14px] text-[#5f5e5e]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#1a8917] font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-[680px] mx-auto z-10 border-t border-[#becab6]/40">
        <p className="text-[14px] text-[#5f5e5e] mb-3 md:mb-0">
          © 2024 MediumRefined. All rights reserved.
        </p>
        <nav className="flex gap-6">
          {["About", "Terms", "Privacy", "Help"].map((item) => (
            <Link key={item} href="#" className="text-[14px] text-[#5f5e5e] hover:text-[#006e05] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}