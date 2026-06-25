"use client";

import { useState } from "react";
import { RoomFormModal } from "./RoomFormModal";
import type { Room } from "@/types/room";

type Props = {
    room: Room;
};

export function EditRoomButton({ room }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="p-sm text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-lg transition-colors"
                title="Edit Room"
            >
                <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>

            {open && (
                <RoomFormModal editRoom={room} onClose={() => setOpen(false)} />
            )}
        </>
    );
}