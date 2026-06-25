"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  icon: string;
};

export default function AdminNavItem({ href, label, icon }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-label-md text-label-md ${
        isActive
          ? "bg-primary-container text-on-primary-container font-bold translate-x-1"
          : "text-on-surface-variant hover:bg-surface-container"
      }`}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}