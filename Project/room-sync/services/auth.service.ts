// services/auth.service.ts

import { apiClient } from "@/lib/api-client";
import { LoginResponse } from "@/types/authentication";


export async function signInUser(
    email: string,
    password: string
):Promise<LoginResponse> {
    console.log("Mehul here");

    return await apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });
}

// export async function me(id:string,role:string){
    
// }

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
    });
}