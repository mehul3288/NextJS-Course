const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/auth");

const {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking
} = require(
  "../controllers/booking.controller"
);

router.get(
  "/",
  auth,
  getBookings
);

router.get(
  "/:id",
  auth,
  getBookingById
);

router.post(
  "/",
  auth,
  createBooking
);

router.patch(
  "/:id/cancel",
  auth,
  cancelBooking
);

module.exports = router;