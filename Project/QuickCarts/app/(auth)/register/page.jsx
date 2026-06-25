"use client"
import React, { useActionState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { registerAction } from "@/actions/auth.actions";

const Register = () => {
   const [state, formAction, isPending] = useActionState(
    registerAction,{errors:null,email:null,name:null}
  );
  return (
    <>
      <Navbar showOnlyIcon={true} />
      <main className="min-h-[calc(100vh-220px)] px-6 md:px-16 lg:px-32 py-14 flex items-center justify-center">
        <section className="w-full max-w-lg border border-gray-300 rounded-lg px-6 py-8 md:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-medium text-gray-900">Register</h1>
            <p className="mt-2 text-sm text-gray-500">
              Create your QuickCart account
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
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
                  placeholder="Create password"
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {isPending?"Adding...":"Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-orange-600">
              Login
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Register;
