// routes/upload.routes.ts

// import { Router } from "express";
// import { upload } from "../middleware/upload.middleware";
const { Router } = require("express");
const { upload } = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const router = Router();

router.post(
    "/image",
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: 0,
                message: "Image is required",
            });
        }

        const imageUrl = `${req.protocol}://${req.get(
            "host"
        )}/uploads/${req.file.filename}`;

        return res.status(200).json({
            success: 1,
            file: {
                url: imageUrl,
            },
        });
    }
);

router.delete(
    "/image",
    (req, res) => {

        const { filename } = req.body;
        console.log(filename);
        fs.unlink(path.join(__dirname, "../uploads", filename), (err) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Failed to delete image",
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Image deleted successfully",
            });
        });
    }
)

module.exports = router;