import type { BookingStatus } from "@/types/booking";

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  scheduled: {
    label: "Scheduled",
    className: "bg-[#d1fae5] text-[#065f46]",
  },
  completed: {
    label: "Completed",
    className: "bg-surface-container-highest text-on-surface-variant",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-[#fee2e2] text-[#991b1b]",
  },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const config = statusConfig[status] ?? statusConfig.scheduled;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}