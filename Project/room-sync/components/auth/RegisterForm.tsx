"use client";

import { useActionState } from "react";
import Link from "next/link";
import {PasswordInput} from "@/components/auth/PasswordInput"
import { type ActionState, registerAction } from "@/actions/auth.actions";

const initialState: ActionState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-md">
      {/* Error banner */}
      {state.error && (
        <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-lg px-md py-sm text-body-sm font-body-sm">
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          {state.error}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-sm">
        <label
          htmlFor="name"
          className="font-label-md text-label-md text-on-surface"
        >
          Full Name
        </label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors select-none text-[20px]">
            person
          </span>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Alex Johnson"
            required
            autoComplete="name"
            className="w-full pl-11 pr-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-sm">
        <label
          htmlFor="email"
          className="font-label-md text-label-md text-on-surface"
        >
          Email Address
        </label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors select-none text-[20px]">
            mail
          </span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="alex@enterprise.com"
            required
            autoComplete="email"
            className="w-full pl-11 pr-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Employee ID */}
      <div className="space-y-sm">
        <label
          htmlFor="employeeId"
          className="font-label-md text-label-md text-on-surface"
        >
          Employee ID
        </label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors select-none text-[20px]">
            badge
          </span>
          <input
            id="employeeId"
            name="employeeId"
            type="text"
            placeholder="EMP001"
            required
            className="w-full pl-11 pr-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-sm">
        <label
          htmlFor="password"
          className="font-label-md text-label-md text-on-surface"
        >
          Password
        </label>
        <PasswordInput
          id="password"
          name="password"
          required
          hint="At least 8 characters"
        />
      </div>

      {/* Submit */}
      <div className="pt-sm">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-sm group disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Complete Registration</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </div>

      {/* Login link */}
      <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
        Already have a RoomSync account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
}