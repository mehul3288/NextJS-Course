import { getServerSession } from "next-auth";
import { apiClient } from "@/lib/api-client";
import type { Room } from "@/types/room";
import { authOptions } from "@/lib/auth";

async function getToken(): Promise<string | undefined> {
    const session = await getServerSession(authOptions);
    return session?.user?.token;
}

export async function getRooms(params?: {
    location?: string;
    capacity_gte?: number;
}): Promise<Room[]> {
    const token = await getToken();
    const query = new URLSearchParams();
    if (params?.location) query.set("location", params.location);
    if (params?.capacity_gte) query.set("capacity_gte", String(params.capacity_gte));

    const qs = query.toString();
    const res = await apiClient<{ success: boolean; data: Room[] }>(
        `/rooms${qs ? `?${qs}` : ""}`,
        { token }
    );
    return res.data;
}

export async function getRoomById(id: string): Promise<Room> {
    const token = await getToken();
    const res = await apiClient<{ success: boolean; data: Room }>(`/rooms/${id}`, {
        token,
    });
    return res.data;
}

export async function createRoom(
    data: Omit<Room, "id">,
    token?: string
): Promise<Room> {
    const res = await apiClient<{ success: boolean; data: Room }>("/rooms", {
        method: "POST",
        body: JSON.stringify(data),
        token,
    });
    return res.data;
}

export async function updateRoom(
    id: string,
    data: Partial<Omit<Room, "id">>,
    token?: string
): Promise<Room> {
    const res = await apiClient<{ success: boolean; data: Room }>(`/rooms/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        token,
    });
    return res.data;
}

export async function deleteRoom(id: string, token?: string): Promise<void> {
    await apiClient(`/rooms/${id}`, {
        method: "DELETE",
        token,
    });
}