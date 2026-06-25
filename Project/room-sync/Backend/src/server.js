require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const authRoutes =
  require("./routes/auth.routes");

const roomRoutes =
  require("./routes/room.routes");

const bookingRoutes =
  require("./routes/booking.routes");

const userRoutes =
  require("./routes/user.routes");

const {
  errorHandler
} = require(
  "./middleware/error-handler"
);

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server running"
  });
});

app.use("/auth", authRoutes);

app.use("/rooms", roomRoutes);

app.use(
  "/bookings",
  bookingRoutes
);

app.use("/users", userRoutes);

app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server started on ${PORT}`
  );
});