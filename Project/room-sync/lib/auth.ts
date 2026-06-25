import { signInUser } from "@/services/auth.service";
import { LoginResponse } from "@/types/authentication";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// Authentication utility placeholder
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "yourname@example.com"
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "* * * * *"
                }
            },
            async authorize(credentials) {
                try {
                    const response:LoginResponse = await signInUser(credentials?.email!, credentials?.password!)
                    console.log(response);

                    return {
                        id: response?.user.id,
                        email: response?.user.email,
                        name: response?.user.name,
                        token: response?.token,
                        empId:response?.user.employeeId,
                        role:response?.user.role,
                    }
                } catch (error) {
                    console.error("Authorization error:", error)
                    return null
                }
            },

        })

    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role=user.role;
                token.employeeId=user.employeeId
            }
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.token = token.accessToken as string;
                session.user.id = token.id;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.employeeId = token.employeeId as string;
                session.user.role = token.role as string;
            }
            return session;
        },
         async redirect({ url, baseUrl, token }) {
            console.log("Mehul with token",token);
            
            // If the user just signed in, check their role and route them
            if (token?.role === 'ADMIN') {
                return `${baseUrl}/admin/dashboard`;
            }
            if (token?.role === 'USER') {
                return `${baseUrl}/profile`;
            }

            // Fallback default
            return baseUrl;
        }
    }
};
