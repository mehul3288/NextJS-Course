const bookingService = require(
  "../services/booking.service"
);

async function getBookings(
  req,
  res,
  next
) {
  try {
    const query = { ...req.query };

    if (req.user.role !== "admin") {
      query.userId = req.user.userId;
    }

    const bookings =
      await bookingService.getBookings(
        query
      );

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
}

async function getBookingById(
  req,
  res,
  next
) {
  try {
    const booking =
      await bookingService.getBookingById(
        req.params.id
      );

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
}

async function createBooking(
  req,
  res,
  next
) {
  try {
    const booking =
      await bookingService.createBooking(
        req.body,
        req.user.userId
      );

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
}

async function cancelBooking(
  req,
  res,
  next
) {
  try {
    const booking =
      await bookingService.cancelBooking(
        req.params.id
      );

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking
};