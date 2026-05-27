"use server"

import { uploadImage } from "@/lib/cloudinary"
import { revalidatePath } from "next/cache"

const { storePost, updatePostLikeStatus } = require("@/lib/posts")
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
    revalidatePath("/","layout");
    redirect("/feed")
}

export async function togglePostLikeStatus(postId,formData){
    await updatePostLikeStatus(postId,2);
    //Nextjs caches data pretty aggresively and hence you won't se changes when data updates they are stored in the db but that page doesn't change becuase nextjs shows you cached pages and after only reload it will update it
    revalidatePath("/feed")

    //if you want to update all the pages you can use 
    // revalidatePath("/","layout")
}