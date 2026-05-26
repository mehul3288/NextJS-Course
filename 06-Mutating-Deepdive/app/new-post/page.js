import { createPost } from "@/actions/posts"
import PostForm from "@/components/post-form"


export default function NewPostPage() {
  //action bt default defines the url where this formdata should be submitted on but in react it works differently
  //this will work but then we will have to convert this to client component
  // async function createPost(prevState,formData) {
  //   //this below it will tell component that it is server action and it will only execute on server and not on client no matter what you do. So when you submit the form it will behind the scene sent a request to itself and will trigger this function.
  //   "use server"
  //   const title = formData.get("title")
  //   const image = formData.get("image")
  //   const content = formData.get("content")
  //   let errors = [];
  //   if (!title || title.trim().length === 0) {
  //     errors.push("Title is required")
  //   }
  //   if (!content || content.trim().length === 0) {
  //     errors.push("Content is required")
  //   }
  //   if (!image||image.size===0) {
  //     errors.push("Image is required")
  //   }
  //   if (errors.length > 0) {
  //     return { errors };
  //   }
  //   await storePost({
  //     imageUrl: "",
  //     title,
  //     content,
  //     userId: 1
  //   })
  //   redirect("/feed")
  // }
  
  // We can also store the server action in separate file and can import it from there. So that we don't have to make so much of adjustments to the component using that

  return (
    <PostForm action={createPost} />
  )

  
}
