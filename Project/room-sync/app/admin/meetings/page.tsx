"use client";

import { useEffect, useState } from "react";
import { getBookingsWithDetailsAction } from "@/actions/booking.actions";
import { MeetingsFilters } from "@/components/admin/MeetingsFilter";
import { MeetingsTable } from "@/components/admin/MeetingTable";
import type { BookingWithDetails } from "@/types/booking";

type FilterValues = {
  location: string;
  date: string;
};

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({ location: "", date: "" });

  const fetchMeetings = async (currentFilters: FilterValues) => {
    setLoading(true);
    try {
      const data = await getBookingsWithDetailsAction({
        location: currentFilters.location || undefined,
        date: currentFilters.date || undefined,
      });
      setMeetings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings(filters);
  }, [filters]);

  const scheduled = meetings.filter((m) => m.status === "scheduled").length;
  const cancelled = meetings.filter((m) => m.status === "cancelled").length;
  const completed = meetings.filter((m) => m.status === "completed").length;

  return (
    <div className="space-y-xl">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Meetings Management
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Oversee and manage all room reservations across enterprise
            locations.
          </p>
        </div>
        {/* Book New Meeting — placeholder button as requested */}
        <button className="bg-primary hover:bg-primary/90 text-on-primary px-xl py-md rounded-lg font-label-md text-label-md shadow-sm transition-all flex items-center gap-sm active:scale-[0.98]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Book New Meeting
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {[
          {
            label: "Total",
            value: meetings.length,
            icon: "event_note",
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Scheduled",
            value: scheduled,
            icon: "schedule",
            color: "text-secondary",
            bg: "bg-secondary/10",
          },
          {
            label: "Completed",
            value: completed,
            icon: "task_alt",
            color: "text-on-surface-variant",
            bg: "bg-surface-container-high",
          },
          {
            label: "Cancelled",
            value: cancelled,
            icon: "cancel",
            color: "text-error",
            bg: "bg-error-container",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex items-center gap-md shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${stat.color}`}
              >
                {stat.icon}
              </span>
            </div>
            <div>
              <p className="font-display text-display text-on-surface leading-none">
                {stat.value}
              </p>
              <p className="text-label-sm text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <MeetingsFilters onFilterChange={setFilters} />

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center p-xl bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
          <div className="flex flex-col items-center gap-md">
            <svg
              className="animate-spin h-8 w-8 text-primary"
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
            <span className="text-body-md text-on-surface-variant font-medium">
              Loading meetings...
            </span>
          </div>
        </div>
      ) : (
        <MeetingsTable meetings={meetings} />
      )}
    </div>
  );
}