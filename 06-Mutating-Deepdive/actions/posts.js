"use server"

import { uploadImage } from "@/lib/cloudinary"

const { storePost } = require("@/lib/posts")
const { redirect } = require("next/navigation")

export async function createPost(prevState, formData) {
    //this below it will tell component that it is server action and it will only execute on server and not on client no matter what you do. So when you submit the form it will behind the scene sent a request to itself and will trigger this function.
    "use server"
    const title = formData.get("title")
    const image = formData.get("image")
    const content = formData.get("content")
    let errors = [];
    if (!title || title.trim().length === 0) {
        errors.push("Title is required")
    }
    if (!content || content.trim().length === 0) {
        errors.push("Content is required")
    }
    if (!image || image.size === 0) {
        errors.push("Image is required")
    }
    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (error) {
        throw new Error("Post not created. Please try again later!")
    }
    if (errors.length > 0) {
        return { errors };
    }
    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    })
    redirect("/feed")
}