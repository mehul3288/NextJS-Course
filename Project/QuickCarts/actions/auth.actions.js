"use server";
import { apiClient } from "@/lib/api-client";
import { redirect } from "next/navigation";

export async function registerAction(
  _prev,
  formData
){
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!name || !email || !password ||!confirmPassword) {
    return { error: "All fields are required.",email:email,name:name };
  }

  if(password.length<8){
    return {error:"Password must be 8 characters long",email:email,name:name}
  }

  if(password!==confirmPassword){
    return {error:"Passwords didn't match",email:email,name:name}
  }

  try {
    await apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Registration failed. Please try again.";
    return { error: message };
  }

  // Auto sign-in after registration
  redirect("/login");
}