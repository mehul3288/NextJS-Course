"use client"
import React, { useActionState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthError from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";


const Login = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction, {
    errors: null, email: null
  }
  );

  async function loginAction(
    _prev,
    formData
  ) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required.", email: email };
    }
    let response;
    response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(response);

    if (!response.ok) {
      if (response.error === "CredentialsSignin") {
        return { error: "Invalid email or password. Please try again.", email: email };
      }
      return { error: "Something went wrong. Please try again.", email: email };
    }

    redirect("/")
  }
  return (
    <>
      {/* <Navbar showOnlyIcon={true} /> */}
      <main className="min-h-[calc(100vh-220px)] px-6 md:px-16 lg:px-32 py-14 flex items-center justify-center">
        <section className="w-full max-w-md border border-gray-300 rounded-lg px-6 py-8 md:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-medium text-gray-900">Login</h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back to QuickCart
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email ID
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state.email}
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {isPending ? "Authenticating..." : "Login"}
            </button>
          </form>

          {/* Error banner */}
          {state.error && (
            <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-lg px-md py-sm text-body-sm font-body-sm">
              <span className="material-symbols-outlined text-[18px] shrink-0">{state.error}</span>

            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-orange-600">
              Register
            </Link>
          </p>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
