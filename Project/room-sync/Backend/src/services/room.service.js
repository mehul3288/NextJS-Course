const { v4: uuid } = require("uuid");

const { db } = require("../lib/db");

const {
  ApiError
} = require("../lib/errors");

async function getRooms(query) {
  const params =
    new URLSearchParams();

  if (query.location) {
    params.append(
      "location",
      query.location
    );
  }

  if (query.capacity_gte) {
    params.append(
      "capacity_gte",
      query.capacity_gte
    );
  }

  const queryString =
    params.toString();

  return db.get(
    `/rooms${
      queryString
        ? `?${queryString}`
        : ""
    }`
  );
}

async function getRoomById(id) {
  const room =
    await db.get(`/rooms/${id}`);

  if (!room) {
    throw new ApiError(
      404,
      "Room not found"
    );
  }

  return room;
}

async function createRoom(data) {
  const {
    name,
    location,
    capacity,
    amenities
  } = data;

  if (
    !name ||
    !location ||
    !capacity
  ) {
    throw new ApiError(
      400,
      "Name, location and capacity are required"
    );
  }

  const room = {
    id: uuid(),
    name,
    location,
    capacity: Number(capacity),
    amenities:
      amenities || []
  };

  return db.post(
    "/rooms",
    room
  );
}

async function updateRoom(
  id,
  data
) {
  await getRoomById(id);

  return db.patch(
    `/rooms/${id}`,
    data
  );
}

async function deleteRoom(id) {
  await getRoomById(id);

  return db.delete(
    `/rooms/${id}`
  );
}

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};