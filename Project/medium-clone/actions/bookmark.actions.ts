"use server";

export async function bookmarkAction(data: any) {
  console.log("bookmarkAction called with:", data);
  return { success: true, data };
}