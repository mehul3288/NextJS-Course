import { Suspense } from "react";
import { getRooms } from "@/services/room.service";
import { AddRoomButton } from "@/components/admin/AddRoomButton";
import { RoomsSearch } from "@/components/admin/RoomsSearch";
import { RoomsTable } from "@/components/admin/RoomsTable";

export const metadata = {
  title: "Rooms | RoomSync Admin",
};

type SearchParams = {
  q?: string;
  location?: string;
};

export default async function AdminRoomsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // const rooms = await getRooms({
  //   location: searchParams.location,
  // });

  // // Client-side search filter on name/location
  // const query = searchParams.q?.toLowerCase() ?? "";
  // const filtered = query
  //   ? rooms.filter(
  //     (r) =>
  //       r.name.toLowerCase().includes(query) ||
  //       r.location.toLowerCase().includes(query) ||
  //       r.amenities.some((a) => a.toLowerCase().includes(query))
  //   )
  //   : rooms;

  // const total = rooms.length;

  return (
    <div className="space-y-xl">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Rooms Management
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Configure and monitor meeting room facilities across all campuses.
          </p>
        </div>
        <AddRoomButton />
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {[
          {
            label: "Total Rooms",
            value: 0,
            sub: "",
            accent: "text-primary",
            bar: null,
          },
          {
            label: "Available Now",
            value: 0,
            sub: "100% capacity",
            accent: "text-secondary",
            bar: "bg-secondary",
          },
          {
            label: "Under Maintenance",
            value: 0,
            sub: "All systems go",
            accent: "text-error",
            bar: "bg-error",
          },
          {
            label: "Avg Utilization",
            value: "—",
            sub: "Peak: 14:00",
            accent: "text-on-surface",
            bar: null,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden"
          >
            {stat.bar && (
              <div
                className={`absolute top-0 left-0 w-1 h-full ${stat.bar}`}
              />
            )}
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-sm mt-sm">
              <span
                className={`font-display text-display ${stat.accent}`}
              >
                {stat.value}
              </span>
              {stat.sub && (
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {stat.sub}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="bg-surface-container-low p-md rounded-xl flex items-center justify-between gap-md border border-outline-variant/30">
        <Suspense>
          <RoomsSearch />
        </Suspense>
        <div className="flex gap-sm shrink-0">
          <button className="p-sm border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </button>
          <button className="p-sm border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <RoomsTable rooms={[]} />
    </div>
  );
}