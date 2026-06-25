import { apiClient } from "@/lib/api-client";

export async function signInUser(
    email,
    password
){
    console.log("Mehul hiiiiiii");
    
    return await apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });
}