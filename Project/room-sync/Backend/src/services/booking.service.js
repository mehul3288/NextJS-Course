const { v4: uuid } = require(
  "uuid"
);

const { db } = require("../lib/db");

const {
  ApiError
} = require("../lib/errors");

function hasConflict(
  bookings,
  startTime,
  endTime
) {
  return bookings.some(
    booking =>
      booking.status !==
        "cancelled" &&
      startTime <
        booking.endTime &&
      endTime >
        booking.startTime
  );
}

async function getBookings(
  query
) {
  const params =
    new URLSearchParams();

  if (query.userId) {
    params.append(
      "userId",
      query.userId
    );
  }

  if (query.roomId) {
    params.append(
      "roomId",
      query.roomId
    );
  }

  if (query.date) {
    params.append(
      "date",
      query.date
    );
  }

  const queryString =
    params.toString();

  return db.get(
    `/bookings${
      queryString
        ? `?${queryString}`
        : ""
    }`
  );
}

async function getBookingById(
  id
) {
  const booking =
    await db.get(
      `/bookings/${id}`
    );

  if (!booking) {
    throw new ApiError(
      404,
      "Booking not found"
    );
  }

  return booking;
}

async function createBooking(
  data,
  userId
) {
  const {
    roomId,
    date,
    startTime,
    endTime
  } = data;

  if (
    !roomId ||
    !date ||
    !startTime ||
    !endTime
  ) {
    throw new ApiError(
      400,
      "Missing required fields"
    );
  }

  if (
    startTime >= endTime
  ) {
    throw new ApiError(
      400,
      "Invalid time range"
    );
  }

  const room =
    await db.get(
      `/rooms/${roomId}`
    );

  if (!room) {
    throw new ApiError(
      404,
      "Room not found"
    );
  }

  const existingBookings =
    await db.get(
      `/bookings?roomId=${roomId}&date=${date}`
    );

  const conflict =
    hasConflict(
      existingBookings,
      startTime,
      endTime
    );

  if (conflict) {
    throw new ApiError(
      400,
      "Room already booked for this slot"
    );
  }

  const booking = {
    id: uuid(),
    roomId,
    userId,
    date,
    startTime,
    endTime,
    status: "scheduled",
    createdAt:
      new Date().toISOString()
  };

  return db.post(
    "/bookings",
    booking
  );
}

async function cancelBooking(
  id
) {
  await getBookingById(id);

  return db.patch(
    `/bookings/${id}`,
    {
      status:
        "cancelled"
    }
  );
}

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking
};