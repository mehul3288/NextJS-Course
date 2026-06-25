"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpWithCredentialsAction } from "@/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";

// function useMutation<TData, TVariables>({ mutationFn }: { mutationFn: (variables: TVariables) => Promise<TData> }) {
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const mutateAsync = async (variables: TVariables) => {
//     setIsError(false);
//     setIsLoading(true);
//     try {
//       const result = await mutationFn(variables);
//       return result;
//     } catch (error) {
//       setIsError(true);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { mutateAsync, isError, isLoading };
// }

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  bio?: string;
  general?: string;
  serverError?: string;
}

interface SignUpState {
  errors: FormErrors;
  error: string | null;
  typedInfo: any;
  success: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync, isError } = useMutation({
    mutationFn: signUpWithCredentialsAction,
    onSuccess: () => {
      router.push("/login");
    }
  });

  const [state, formAction, isPending] = useActionState(signUpAction, {
    errors: {} as FormErrors,
    error: null as string | null,
    typedInfo: null as any,
    success: false
  });

  async function signUpAction(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
    console.log("Mehul here 17");
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const bio = formData.get("bio") as string;

    const newErrors: FormErrors = {};

    if (!fullName || !fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!email || !email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!bio || !bio.trim()) {
      newErrors.bio = "A short bio is required.";
    }
    console.log("Mehul here 1");
    if (Object.keys(newErrors).length > 0) {
      return {
        errors: newErrors,
        error: null,
        typedInfo: { fullName, email, bio },
        success: false
      };
    }
    console.log("Mehul here 2");
    try {
      console.log("Mehul here");
      await mutateAsync({ name: fullName, email, password, bio });

      return {
        errors: {} as FormErrors,
        error: null,
        success: true,
        typedInfo: null
      };
    } catch (error: any) {
      return {
        errors: {
          serverError: error instanceof Error ? error.message : "Something went wrong. Please try again."
        } as FormErrors,
        error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        typedInfo: { fullName, email, bio },
        success: false
      };
    }
  }

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col">
      <header className=" top-0 w-full z-50 flex justify-center items-center h-20 px-4 pointer-events-none">
        <h1 className="font-['Source_Serif_4'] text-[28px] md:text-[36px] font-bold tracking-tight text-[#1a1c1c]">
          Medium
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 pt-5 pb-16 z-10">
        <div className="w-full max-w-[440px] bg-white rounded-lg border border-[#becab6]/40 p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="text-center mb-8">
            <h2 className="font-['Inter'] text-[24px] font-semibold tracking-tight text-[#1a1c1c] mb-1">
              Join our community
            </h2>
            <p className="text-[14px] text-[#5f5e5e]">
              A sanctuary for long-form thought and deep conversation.
            </p>
          </div>

          {/* General/Server error */}
          {(state?.error || state?.errors?.serverError) && (
            <div className="mb-6 px-4 py-3 bg-[#ffdad6] text-[#93000a] rounded-lg text-sm font-medium">
              {state.error || state.errors.serverError}
            </div>
          )}

          <form action={formAction} className="space-y-5" noValidate>
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Elias Thorne"
                defaultValue={state?.typedInfo?.fullName}
                className={`w-full bg-transparent border-0 border-b focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200 ${state?.errors?.fullName ? "border-[#ba1a1a]" : "border-[#becab6] focus:border-[#006e05]"
                  }`}
              />
              {state?.errors?.fullName && <p className="text-[12px] text-[#ba1a1a] mt-1">{state.errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="elias@writer.com"
                defaultValue={state?.typedInfo?.email}
                className={`w-full bg-transparent border-0 border-b focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200 ${state?.errors?.email ? "border-[#ba1a1a]" : "border-[#becab6] focus:border-[#006e05]"
                  }`}
              />
              {state?.errors?.email && <p className="text-[12px] text-[#ba1a1a] mt-1">{state.errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min. 8 characters"
                  defaultValue={state?.typedInfo?.password}
                  className={`w-full bg-transparent border-0 border-b focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 pr-10 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200 ${state?.errors?.password ? "border-[#ba1a1a]" : "border-[#becab6] focus:border-[#006e05]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#5f5e5e] hover:text-[#006e05] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {state?.errors?.password && <p className="text-[12px] text-[#ba1a1a] mt-1">{state.errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter your password"
                  defaultValue={state?.typedInfo?.confirmPassword}
                  className={`w-full bg-transparent border-0 border-b focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 pr-10 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200 ${state?.errors?.confirmPassword ? "border-[#ba1a1a]" : "border-[#becab6] focus:border-[#006e05]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#5f5e5e] hover:text-[#006e05] transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
              {state?.errors?.confirmPassword && <p className="text-[12px] text-[#ba1a1a] mt-1">{state.errors.confirmPassword}</p>}
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <label htmlFor="bio" className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#5f5e5e]">
                About You
              </label>
              <textarea
                id="bio"
                name="bio"
                required
                rows={3}
                placeholder="A short bio — who you are, what you write about…"
                defaultValue={state?.typedInfo?.bio}
                className={`w-full bg-transparent border-b focus:border-b-2 focus:outline-none focus:ring-0 px-1 py-2 text-[16px] font-medium text-[#1a1c1c] placeholder:text-[#becab6] transition-all duration-200 resize-none border-0 ${state?.errors?.bio ? "border-[#ba1a1a]" : "border-[#becab6] focus:border-[#006e05]"
                  }`}
              />
              {state?.errors?.bio && <p className="text-[12px] text-[#ba1a1a] mt-1">{state.errors.bio}</p>}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-[#1a8917] cursor-pointer text-white font-medium text-[16px] rounded-full hover:bg-[#006e05] active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Terms */}
          <p className="mt-5 text-center text-[12px] text-[#5d5d5d] leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-[#006e05]">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-[#006e05]">Privacy Policy</Link>.
          </p>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-[14px] text-[#5f5e5e]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1a8917] font-bold hover:underline ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-[680px] mx-auto z-10 border-t border-[#becab6]/40">
        <p className="text-[14px] text-[#5f5e5e] mb-3 md:mb-0">
          © 2024 MediumRefined.
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