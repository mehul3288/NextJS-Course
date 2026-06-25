"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { cancelBookingAction } from "@/actions/booking.actions";

type Props = {
  bookingId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
};

export function CancelMeetingButton({
  bookingId,
  userName,
  date,
  startTime,
  endTime,
}: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
const { data: session } = useSession();
  const token = session?.token;

  function handleCancel() {
    setError(null);
    startTransition(async () => {
      const result = await cancelBookingAction(bookingId,token);
      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error-container/30"
        title="Cancel Meeting"
      >
        <span className="material-symbols-outlined text-[20px]">cancel</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[100] flex items-center justify-center p-gutter">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-2xl border border-outline-variant overflow-hidden">
            <div className="p-xl">
              {/* Icon */}
              <div className="w-12 h-12 bg-error-container text-error rounded-full flex items-center justify-center mb-lg">
                <span className="material-symbols-outlined text-[28px]">
                  warning
                </span>
              </div>

              <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-sm">
                Cancel Meeting?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
                Are you sure you want to cancel the meeting for{" "}
                <span className="font-bold text-on-surface">{userName}</span>{" "}
                on{" "}
                <span className="font-bold text-on-surface">{date}</span> from{" "}
                <span className="font-bold text-on-surface">
                  {startTime} – {endTime}
                </span>
                ? This will release the room immediately.
              </p>

              {error && (
                <p className="text-body-sm text-error mb-md flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">
                    error
                  </span>
                  {error}
                </p>
              )}

              <div className="flex gap-md justify-end">
                <button
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="px-xl py-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-label-md text-label-md disabled:opacity-50"
                >
                  Keep Meeting
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isPending}
                  className="px-xl py-md bg-error text-on-error hover:bg-error/90 rounded-lg transition-all font-label-md text-label-md shadow-sm flex items-center gap-sm disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm Cancellation"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}