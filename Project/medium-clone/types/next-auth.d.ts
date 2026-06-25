import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      token: string;
    } & DefaultSession["user"];
    token?: string;
  }

  /**
   * The shape of the user object returned in the OAuth providers' or CredentialsProvider's `authorize` callback
   */
  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and used to construct the custom session
   */
  interface JWT {
    id: string;
    token: string;
  }
}
