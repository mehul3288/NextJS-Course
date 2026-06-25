const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser,
} = require("../services/userService");

const router = express.Router();

//Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;

        if (!name || !email || !password || !bio) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            bio,
            blogIds: [],
            createdAt: Date.now(),
        });

        res.status(201).json({
            message: 'Signup successful',
            user: user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

//Sign In
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

module.exports = router;