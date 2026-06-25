import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUpUser } from "@/services/auth.service";
import { log } from "console";

export async function signUpWithCredentialsAction(data: {
  name: string;
  email: string;
  password: string;
  bio: string;
}) {
  "use server"
  console.log("Mehul here 3");
  return await signUpUser(data.name, data.email, data.password, data.bio);
}


export async function signInWithEmailAction(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // console.log(formData);

  console.log("upper", email, password);
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  console.log("below", email, password);


  if (result?.error) {
    return {
      error: result?.error as string || "Something went wrong. Please try again later",
      typedInfo: { email },
    }
  }

  redirect("/write");
}

