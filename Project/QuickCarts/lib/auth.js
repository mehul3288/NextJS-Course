import { signInUser } from "@/services/auth.service";
import CredentialsProvider from "next-auth/providers/credentials";


// Authentication utility placeholder
export const authOptions = {
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
                    //Here login logic
                    const response = await signInUser(credentials?.email, credentials?.password)
                    console.log(response);

                    return {
                        id: response?.id,
                        email: response?.email,
                        name: response?.name,
                        token: response?.token,
                        role: response?.role || 'user',
                    }
                } catch (error) {
                    console.error("Authorization error:", error)
                    return null
                }
            },

        })

    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log(user);
            
            if (user) {
                token.accessToken = user.token;
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log(token);
            
            if (session) {
                console.log("Sessission");
                
                session.token = token.accessToken
                session.user.id = token.id;
                session.user.email = token.email
                session.user.name = token.name;
                session.user.role = token.role;
            }
            return session;
        }
    }
};
