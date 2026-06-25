import type { Room } from "@/types/room";
import { EditRoomButton } from "./EditRoomButton";
import { DeleteRoomButton } from "./DeleteRoomButton";

// Icon map for amenities
const amenityIcons: Record<string, string> = {
    Projector: "videocam",
    "4K Smart TV": "tv",
    "Video Conferencing": "settings_input_antenna",
    Whiteboard: "edit_note",
    "Coffee Station": "coffee",
    Soundproof: "hearing",
};

// Cycle avatar bg colors per room
const roomColors = [
    "bg-primary/10 text-primary",
    "bg-secondary/10 text-secondary",
    "bg-tertiary/10 text-tertiary",
    "bg-[#fef3c7] text-[#92400e]",
    "bg-[#ede9fe] text-[#5b21b6]",
];

function roomColor(id: string) {
    const idx =
        id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
        roomColors.length;
    return roomColors[idx];
}

type Props = {
    rooms: Room[];
};

export function RoomsTable({ rooms }: Props) {
    if (rooms.length === 0) {
        return (
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 py-2xl flex flex-col items-center gap-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] text-outline">
                    meeting_room
                </span>
                <p className="font-body-md text-body-md">No rooms found.</p>
                <p className="font-body-sm text-body-sm">
                    Add your first room to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-low/50 border-b border-outline-variant/30">
                            {["Room Name", "Location", "Capacity", "Amenities", "Actions"].map(
                                (h, i) => (
                                    <th
                                        key={h}
                                        className={`px-lg py-md text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${i === 4 ? "text-right" : ""
                                            }`}
                                    >
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-outline-variant/20">
                        {rooms.map((room) => (
                            <tr
                                key={room.id}
                                className="hover:bg-surface-container-low/30 transition-colors group"
                            >
                                {/* Room Name */}
                                <td className="px-lg py-lg">
                                    <div className="flex items-center gap-md">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${roomColor(
                                                room.id
                                            )}`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                meeting_room
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-body-md text-body-md font-bold text-on-surface">
                                                {room.name}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Location */}
                                <td className="px-lg py-lg">
                                    <p className="font-body-md text-body-md text-on-surface-variant">
                                        {room.location}
                                    </p>
                                </td>

                                {/* Capacity */}
                                <td className="px-lg py-lg">
                                    <div className="flex items-center gap-xs text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[16px]">
                                            group
                                        </span>
                                        <span className="font-body-md text-body-md">
                                            {room.capacity} People
                                        </span>
                                    </div>
                                </td>

                                {/* Amenities */}
                                <td className="px-lg py-lg">
                                    {room.amenities.length === 0 ? (
                                        <span className="text-label-sm text-outline">—</span>
                                    ) : (
                                        <div className="flex items-center gap-xs flex-wrap">
                                            {room.amenities.map((amenity) => (
                                                <span
                                                    key={amenity}
                                                    title={amenity}
                                                    className="material-symbols-outlined text-outline text-[18px]"
                                                >
                                                    {amenityIcons[amenity] ?? "check_circle"}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-lg py-lg text-right">
                                    <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        <EditRoomButton room={room} />
                                        <DeleteRoomButton roomId={room.id} roomName={room.name} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination placeholder — extend when API supports it */}
            <div className="px-lg py-md bg-surface-container-low border-t border-outline-variant/30 flex justify-between items-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                    Showing <span className="font-bold">{rooms.length}</span> room
                    {rooms.length !== 1 ? "s" : ""}
                </p>
            </div>
        </div>
    );
}