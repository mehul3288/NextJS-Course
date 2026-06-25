// lib/session.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getToken(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.token ?? null;
}