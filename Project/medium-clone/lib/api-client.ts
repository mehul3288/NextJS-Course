// lib/api-client.ts
"use server"

import { getServerSession } from "next-auth";


const baseUrl = "http://localhost:5000/api";



export async function apiClient(
    endpoint: string,
    options: RequestInit = {},
    authHeaders: boolean = true,
    token?: string
) {
    if (authHeaders && !token) {
        throw new Error("You are not authorized to perform this action");
    }

    const session = await getServerSession();
    console.log(session);

    const response = await fetch(
        `${baseUrl}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
                ...options.headers,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "An error occurred");
    }

    return data;
}