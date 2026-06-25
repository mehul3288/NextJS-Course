export type BookingStatus = "scheduled" | "cancelled" | "completed";

export type Booking = {
  id: string;
  roomId: string;
  userId: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  status: BookingStatus;
  createdAt: string;
};

// Enriched version joined with room + user for admin views
export type BookingWithDetails = Booking & {
  userName: string;
  userEmail: string;
  employeeId: string;
  roomName: string;
  location: string;
  capacity: number;
};