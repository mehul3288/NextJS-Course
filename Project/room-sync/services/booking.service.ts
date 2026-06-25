// import { auth } from "@/auth";
import { apiClient } from "@/lib/api-client";
import { getToken } from "@/lib/session";
import type { Booking, BookingWithDetails } from "@/types/booking";

export async function getBookings(params?: {
  roomId?: string;
  userId?: string;
  date?: string;
}): Promise<Booking[]> {
//   const session = await auth();
 const token = await getToken();
  const query = new URLSearchParams();
  if (params?.roomId) query.set("roomId", params.roomId);
  if (params?.userId) query.set("userId", params.userId);
  if (params?.date) query.set("date", params.date);

  const qs = query.toString();
  const res = await apiClient(`/bookings${qs ? `?${qs}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data as Booking[];
}

export async function getBookingsWithDetails(params?: {
  date?: string;
  location?: string;
}): Promise<BookingWithDetails[]> {
const token = await getToken();
  const [bookingsRes, roomsRes, usersRes] = await Promise.all([
    apiClient("/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    apiClient("/rooms", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    apiClient("/users", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  const bookings = bookingsRes.data as Booking[];
  const rooms = roomsRes.data as Array<{
    id: string;
    name: string;
    location: string;
    capacity: number;
  }>;
  const users = usersRes.data as Array<{
    id: string;
    name: string;
    email: string;
    employeeId: string;
  }>;

  const roomMap = new Map(rooms.map((r) => [r.id, r]));
  const userMap = new Map(users.map((u) => [u.id, u]));

  let result: BookingWithDetails[] = bookings.map((b) => {
    const room = roomMap.get(b.roomId);
    const user = userMap.get(b.userId);
    return {
      ...b,
      userName: user?.name ?? "Unknown",
      userEmail: user?.email ?? "",
      employeeId: user?.employeeId ?? "",
      roomName: room?.name ?? "Unknown Room",
      location: room?.location ?? "",
      capacity: room?.capacity ?? 0,
    };
  });

  // Apply filters
  if (params?.date) {
    result = result.filter((b) => b.date === params.date);
  }
  if (params?.location) {
    result = result.filter((b) =>
      b.location.toLowerCase().includes(params.location!.toLowerCase())
    );
  }

  return result;
}

export async function cancelBooking(id: string): Promise<void> {
//   const session = await auth();
const token = await getToken();

  await apiClient(`/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
}