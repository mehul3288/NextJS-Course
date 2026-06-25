import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | RoomSync",
};

export default function LoginPage() {
  return (
    <main className="w-full max-w-[480px] z-10">
      <div className="bg-surface shadow-xl rounded-xl border border-outline-variant/30 overflow-hidden">
        <div className="px-xl pt-2xl pb-xl">
          {/* Branding */}
          <div className="flex flex-col items-center mb-xl">
            <div className="w-16 h-16 mb-md flex items-center justify-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-[28px]">
                  meeting_room
                </span>
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-xs">
              Welcome back
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-center px-md">
              Manage your enterprise workspaces with RoomSync.
            </p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>

        {/* Bottom tray */}
        <div className="bg-surface-container-low px-xl py-md flex justify-between items-center border-t border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-outline">
            v1.0.0
          </span>
          <div className="flex gap-md">
            <Link
              href="#"
              className="font-label-sm text-label-sm text-outline hover:text-on-surface-variant transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="font-label-sm text-label-sm text-outline hover:text-on-surface-variant transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <p className="mt-xl text-center font-body-sm text-body-sm text-outline/70">
        © 2024 RoomSync Enterprise. All rights reserved.
      </p>
    </main>
  );
}