const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/auth");

const admin =
  require("../middleware/admin");

const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require(
  "../controllers/room.controller"
);

router.get(
  "/",
  auth,
  getRooms
);

router.get(
  "/:id",
  auth,
  getRoomById
);

router.post(
  "/",
  auth,
  admin,
  createRoom
);

router.patch(
  "/:id",
  auth,
  admin,
  updateRoom
);

router.delete(
  "/:id",
  auth,
  admin,
  deleteRoom
);

module.exports = router;