// app/dashboard/page.tsx (Server Component)
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
// adjust path
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Safely check the role from the server session data
  if (session.user?.role === "admin") {
    redirect("/admin/meetings");
  } else {
    redirect("/rooms");
  }
}
