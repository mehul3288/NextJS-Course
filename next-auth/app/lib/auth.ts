import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email",placeholder:"your@test.com"},
                password:{
                    label:"Password",
                    type:"password"
                }
            },
            async authorize(credentials){
                //here we will do our authentication by making an api calls or reaching out to local backend or nextjs backend
                console.log(credentials!);
                return {
                    id:"1",
                    email:credentials!.email
                }
                
            }
        })
    ],
    session:{
        strategy:"jwt",
    },
    pages:{
        signIn:"/login"
    },
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id
            }
            return token;
        },
        async session({session,token}){
            if(session.user){
                //@ts-ignore
                session.user.id=token.id
            }
            return session;
        }
    }
}