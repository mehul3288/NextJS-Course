"use server";

export async function likeAction(data: any) {
  console.log("likeAction called with:", data);
  return { success: true, data };
}