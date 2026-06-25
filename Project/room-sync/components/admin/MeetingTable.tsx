import type { BookingWithDetails } from "@/types/booking";
import { StatusBadge } from "./StatusBadge";
import { CancelMeetingButton } from "./CancelMeetingModal";


function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Cycle through a small set of avatar bg colors by name hash
const avatarColors = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-tertiary/10 text-tertiary",
  "bg-[#fef3c7] text-[#92400e]",
  "bg-[#ede9fe] text-[#5b21b6]",
];

function avatarColor(name: string) {
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    avatarColors.length;
  return avatarColors[idx];
}

type Props = {
  meetings: BookingWithDetails[];
};

export function MeetingsTable({ meetings }: Props) {
  if (meetings.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 py-2xl flex flex-col items-center gap-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-[48px] text-outline">
          event_busy
        </span>
        <p className="font-body-md text-body-md">No meetings found.</p>
        <p className="font-body-sm text-body-sm">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/30">
              {[
                "Employee",
                "Room",
                "Location",
                "Date & Time",
                "Status",
                "Actions",
              ].map((h, i) => (
                <th
                  key={h}
                  className={`px-gutter py-md text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${
                    i === 5 ? "text-right" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant/30">
            {meetings.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-surface-container-low transition-colors group"
              >
                {/* Employee */}
                <td className="px-gutter py-lg">
                  <div className="flex items-center gap-md">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-label-sm shrink-0 ${avatarColor(
                        m.userName
                      )}`}
                    >
                      {getInitials(m.userName)}
                    </div>
                    <div>
                      <p className="font-body-md text-body-md font-semibold text-on-surface">
                        {m.userName}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {m.employeeId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Room */}
                <td className="px-gutter py-lg">
                  <div className="flex items-center gap-sm">
                    <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
                    <div>
                      <p className="font-body-md text-body-md font-medium text-on-surface">
                        {m.roomName}
                      </p>
                      <p className="text-label-sm text-on-surface-variant">
                        Capacity: {m.capacity}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-gutter py-lg">
                  <p className="font-body-md text-body-md text-on-surface">
                    {m.location}
                  </p>
                </td>

                {/* Date & Time */}
                <td className="px-gutter py-lg">
                  <p className="font-body-md text-body-md font-medium text-on-surface">
                    {new Date(m.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    {m.startTime} – {m.endTime}
                  </p>
                </td>

                {/* Status */}
                <td className="px-gutter py-lg">
                  <StatusBadge status={m.status} />
                </td>

                {/* Actions */}
                <td className="px-gutter py-lg text-right">
                  <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.status === "scheduled" && (
                      <CancelMeetingButton
                        bookingId={m.id}
                        userName={m.userName}
                        date={m.date}
                        startTime={m.startTime}
                        endTime={m.endTime}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}