import db from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials:{
                email:{
                    label:"Email", type:"email", placeholder:"your@test.com"
                },
                password:{
                    label:"Password",
                    type:"password"
                }
            },
            async authorize(credentials){
               const result=await login(credentials);

            }
        })
    ]
}