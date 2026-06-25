const express = require("express");
const fs = require("fs");
const path = require("path");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createBlog,
    updateBlog,
    getBlogById,
    getBlogBySlug,
    deleteBlog,
} = require("../services/blogService");
const { createSlug } = require("../helper/helper");
const { updateBlogsIds, findUserByEmail, updateLikedBlogs } = require("../services/userService");

const router = express.Router();

//create/update blog
router.post(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const {
                id,
                title,
                content,
                category,
                tags,
                bannerImage,
                author,
                authorId,
            } = req.body;
            console.log(id);

            if (id) {
                console.log("Hey akshay");

                try {
                    const existing =
                        await getBlogBySlug(id);
                    console.log(content);

                    if (existing) {
                        const updated =
                            await updateBlog(existing.id, {
                                title,
                                content,
                                category,
                                tags,
                                bannerImage,
                            });

                        return res.json(updated);
                    }
                } catch { }
            }

            const blog = {
                id,
                title,

                slug: createSlug(title),

                bannerImage,

                content,

                author,

                authorId,

                category: "",

                tags: [],

                isPublished: true,

                isSuspended: false,

                likesCount: 0,

                createdAt:
                    new Date().toISOString(),
            };
            console.log(blog);

            const created =
                await createBlog(blog);

            await updateBlogsIds(authorId, created.id)
            res.status(201).json(created);
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    }
);

//get blog
router.get("/:slug", async (req, res) => {
    console.log("Mehul here hii", req.params.slug);

    let blog = await getBlogBySlug(
        req.params.slug
    );
    console.log(blog);

    if (!blog) {
        try {
            blog = await getBlogById(req.params.slug);
        } catch (err) {
            // Ignore error if it's just not found
        }
    }

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found",
        });
    }

    res.json(blog);
});

//like blog
router.patch(
    "/:slug/like",
    authMiddleware,
    async (req, res) => {
        const { id: userId } = req.user;
        // Retrieve the blog by slug
        const blog = await getBlogBySlug(req.params.slug);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        // Fetch up‑to‑date user information
        const user = await findUserById(userId);
        const hasLiked = user.likedBlogs.includes(blog.id);
        let updatedBlog;
        if (hasLiked) {
            // Unlike: decrement likesCount and remove from liked list
            updatedBlog = await updateBlog(blog.id, { likesCount: blog.likesCount - 1 });
            await updateLikedBlogs(userId, blog.id); // removes the blog id from likedBlogs
        } else {
            // Like: increment likesCount and add to liked list
            updatedBlog = await updateBlog(blog.id, { likesCount: blog.likesCount + 1 });
            await addLikedBlog(userId, blog.id); // adds the blog id to likedBlogs
        }
        return res.json(updatedBlog);
    }
);

//suspend/unsuspend blog
router.patch(
    "/:id/suspend",
    authMiddleware,
    async (req, res) => {
        const blog =
            await getBlogById(
                req.params.id
            );

        const isOwner =
            blog.authorId ===
            req.user.userId;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }

        const updated =
            await updateBlog(
                req.params.id,
                {
                    isSuspended:
                        !blog.isSuspended,
                }
            );

        res.json(updated);
    }
);

//delete blog
router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {
        const blog =
            await getBlogById(
                req.params.id
            );

        const isOwner =
            blog.authorId ===
            req.user.userId;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }

        await deleteBlog(req.params.id);

        const uploadDir =
            path.join(
                __dirname,
                "../uploads",
                req.params.id
            );

        if (fs.existsSync(uploadDir)) {
            fs.rmSync(uploadDir, {
                recursive: true,
                force: true,
            });
        }

        res.json({
            message:
                "Blog deleted successfully",
        });
    }
);

module.exports = router;