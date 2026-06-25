"use server";

export async function blogAction(data: any) {
  console.log("blogAction called with:", data);
  return { success: true, data };
}