import AdminNavItem from "@/components/admin/AdminNavItem";
import SignOut from "@/components/auth/SignOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/rooms", label: "Rooms", icon: "meeting_room" },
  { href: "/admin/meetings", label: "Meetings", icon: "event_note" },
  { href: "/admin/users", label: "Users", icon: "group" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/rooms");

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A";
  
   

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col bg-surface border-r border-outline-variant/50 z-50">
        {/* Brand */}
        <div className="px-lg pt-xl pb-lg">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                meeting_room
              </span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
              RoomSync
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-xs ml-10">
            Admin Panel
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-md space-y-xs overflow-y-auto">
          {navItems.map((item) => (
            <AdminNavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Bottom section */}
        <div className="px-md pb-md pt-md border-t border-outline-variant/50 space-y-xs">
          <Link
            href="#"
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Support</span>
          </Link>

          {/* Logged-in user card */}
          <div className="flex items-center gap-md px-md py-sm rounded-lg bg-surface-container-low">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-label-sm font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label-md font-semibold text-on-surface truncate">
                {user.name}
              </p>
              <p className="text-label-sm text-on-surface-variant truncate">
                {user.email}
              </p>
            </div>
          </div>

          {/* Logout — server action inline */}
         <SignOut/>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-gutter bg-surface-container-low border-b border-outline-variant/30 shadow-sm">
          <span className="font-headline-md text-headline-md text-primary font-bold">
            RoomSync
          </span>
          <div className="flex items-center gap-sm">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-label-sm font-semibold text-secondary">
              System Online
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-gutter max-w-[1400px] w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-gutter py-lg border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="text-label-sm text-on-surface-variant">
            © 2024 RoomSync Enterprise. All rights reserved.
          </span>
          <div className="flex gap-lg">
            {["Privacy Policy", "Terms of Service", "Help Center"].map(
              (label) => (
                <Link
                  key={label}
                  href="#"
                  className="text-label-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}