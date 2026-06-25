"use server"
import { createUser, getUserByEmail } from "@/lib/user";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
        return {
            error: "Please enter valid email and password"
        };
    }
    // Check existing user
    const existingUser = getUserByEmail(email);
    if (existingUser) {
        return {
            error: "User already exists"
        };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    createUser(email, hashedPassword);
    redirect("/login?mode=login");
}