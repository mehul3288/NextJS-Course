// actions/booking.actions.ts
"use server";

import { apiClient } from "@/lib/api-client";
import { revalidatePath } from "next/cache";
import { getBookingsWithDetails } from "@/services/booking.service";
import type { BookingWithDetails } from "@/types/booking";

export async function getBookingsWithDetailsAction(params?: {
  date?: string;
  location?: string;
}): Promise<BookingWithDetails[]> {
  return getBookingsWithDetails(params);
}

export async function cancelBookingAction(
  bookingId: string,
  token?: string
): Promise<{ error?: string }> {
  try {
    await apiClient(`/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      token,
    });
    revalidatePath("/admin/meetings");
    return {};
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to cancel." };
  }
}