"use client";

import { useActionState } from "react";
import Link from "next/link";
import {PasswordInput} from "@/components/auth/PasswordInput"
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { ActionState } from "@/actions/auth.actions";
import  AuthError from "next-auth";

const initialState: ActionState = {};


export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  async function loginAction(
    _prev: ActionState,
    formData: FormData
  ): Promise<ActionState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required." };
    }
    let user;
    try {
      user=await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        return { error: "Invalid email or password. Please try again." };
      }
      return { error: "Something went wrong. Please try again." };
    }

    redirect("/")
  }

  return (
    <form action={formAction} className="space-y-lg">
      {/* Error banner */}
      {state.error && (
        <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-lg px-md py-sm text-body-sm font-body-sm">
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          {state.error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-sm">
        <label
          htmlFor="email"
          className="font-label-md text-label-md text-on-surface ml-xs"
        >
          Corporate Email
        </label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors select-none">
            mail
          </span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            required
            autoComplete="email"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-md pl-11 pr-md font-body-md text-body-md text-on-surface placeholder:text-outline-variant outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-sm">
        <div className="flex justify-between items-center ml-xs">
          <label
            htmlFor="password"
            className="font-label-md text-label-md text-on-surface"
          >
            Password
          </label>
          <Link
            href="#"
            className="font-label-sm text-label-sm text-primary hover:underline transition-all"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput id="password" name="password" required />
      </div>

      {/* Submit */}
      <div className="pt-sm">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-on-primary py-md px-lg rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
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
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </div>

      {/* Register link */}
      <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
        New to RoomSync?{" "}
        <Link
          href="/register"
          className="text-primary font-bold hover:underline"
        >
          Register your business
        </Link>
      </p>
    </form>
  );
}