// services/auth.service.ts

import { apiClient } from "@/lib/api-client";


export async function signInUser(
    email: string,
    password: string
) {
    console.log("Mehul here");

    return await apiClient("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    }, false);
}

export async function signUpUser(
    name: string,
    email: string,
    password: string,
    bio: string
) {
    return await apiClient("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            password,
            bio
        }),
    }, false);
}