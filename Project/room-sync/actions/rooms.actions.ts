"use server";

import { revalidatePath } from "next/cache";
import { createRoom, updateRoom, deleteRoom } from "@/services/room.service";
import type { Room } from "@/types/room";

export type RoomActionState = {
    error?: string;
    success?: boolean;
};

export async function createRoomAction(
    _prev: RoomActionState,
    formData: FormData,
    token?: string
): Promise<RoomActionState> {
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const capacity = Number(formData.get("capacity"));
    const amenities = formData.getAll("amenities") as string[];

    if (!name || !location || !capacity) {
        return { error: "Room name, location, and capacity are required." };
    }

    if (capacity < 1) {
        return { error: "Capacity must be at least 1." };
    }

    try {
        await createRoom({ name, location, capacity, amenities }, token);
        revalidatePath("/admin/rooms");
        return { success: true };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create room.";
        return { error: message };
    }
}

export async function updateRoomAction(
    id: string,
    data: Partial<Omit<Room, "id">>,
    token?: string
): Promise<RoomActionState> {
    try {
        await updateRoom(id, data, token);
        revalidatePath("/admin/rooms");
        return { success: true };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update room.";
        return { error: message };
    }
}

export async function deleteRoomAction(
    id: string,
    token?: string
): Promise<RoomActionState> {
    try {
        await deleteRoom(id, token);
        revalidatePath("/admin/rooms");
        return { success: true };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete room.";
        return { error: message };
    }
}