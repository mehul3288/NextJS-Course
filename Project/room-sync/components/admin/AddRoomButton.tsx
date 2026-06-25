"use client";

import { useState } from "react";
import { RoomFormModal } from "./RoomFormModal";

export function AddRoomButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-sm px-lg py-md bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 shadow-sm transition-all active:scale-[0.98]"
            >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Room
            </button>

            {open && <RoomFormModal onClose={() => setOpen(false)} />}
        </>
    );
}