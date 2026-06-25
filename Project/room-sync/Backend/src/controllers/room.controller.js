const roomService = require("../services/room.service");

async function getRooms(req, res, next) {
  try {
    const rooms = await roomService.getRooms(
      req.query
    );

    res.json({
      success: true,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
}

async function getRoomById(
  req,
  res,
  next
) {
  try {
    const room =
      await roomService.getRoomById(
        req.params.id
      );

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
}

async function createRoom(
  req,
  res,
  next
) {
  try {
    const room =
      await roomService.createRoom(
        req.body
      );

    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
}

async function updateRoom(
  req,
  res,
  next
) {
  try {
    const room =
      await roomService.updateRoom(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
}

async function deleteRoom(
  req,
  res,
  next
) {
  try {
    await roomService.deleteRoom(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Room deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};