require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./middleware/authMiddleware")

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const uploadRoutes = require("./routes/uploadRoute");

const app = express();

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

app.use(cors());
app.use(express.json({
    limit: "10mb"
}));
app.use(express.urlencoded({
    extended: true,
}));

app.use("/api/uploads", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected Route",
        user: req.user,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});