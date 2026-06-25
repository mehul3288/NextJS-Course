"use server";
import { apiClient } from "@/lib/api-client";
import { redirect } from "next/navigation";


export type ActionState = {
  error?: string;
  success?: boolean;
};



export async function registerAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const employeeId = formData.get("employeeId") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !employeeId || !password) {
    return { error: "All fields are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    await apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, employeeId, password }),
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Registration failed. Please try again.";
    return { error: message };
  }

  // Auto sign-in after registration
  redirect("/login");
}