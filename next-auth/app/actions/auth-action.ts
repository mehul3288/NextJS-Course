import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function loginAction(prevState:any,formData:any){

        const email=formData.get("email")
        const password=formData.get("password");
        const result =await signIn("credentials",{
            email,
            password,
            redirect:false
        })
        if(result?.error){
            return {error:result.error}
        }
        redirect("/random");        
}