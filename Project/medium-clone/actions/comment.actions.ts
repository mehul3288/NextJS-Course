"use server";

export async function commentAction(data: any) {
  console.log("commentAction called with:", data);
  return { success: true, data };
}