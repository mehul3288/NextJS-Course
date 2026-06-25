// middleware/upload.middleware.ts

// import multer from "multer";
// import path from "path";
// import fs from "fs";
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadDir);
    },

    filename: (_, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);

        cb(
            null,
            `img-${timestamp}${ext}`
        );
    },
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },

    fileFilter: (_, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
            return;
        }

        cb(new Error("Only image files are allowed"));
    },
});

module.exports = { upload };