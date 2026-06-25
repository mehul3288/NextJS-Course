import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | RoomSync",
};

export default function RegisterPage() {
  return (
    <main className="w-full max-w-[480px] z-10">
      <div className="bg-surface shadow-xl rounded-xl border border-outline-variant/30 overflow-hidden">
        <div className="px-xl pt-2xl pb-xl">
          {/* Branding */}
          <div className="mb-xl">
            <div className="flex items-center gap-2 mb-md">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-[24px]">
                  meeting_room
                </span>
              </div>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                RoomSync
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
              Create your account
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join your enterprise workplace network today.
            </p>
          </div>

          {/* Form */}
          <RegisterForm />
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
              Security
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