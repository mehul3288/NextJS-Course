"use server";

export async function adminAction(data: any) {
  console.log("adminAction called with:", data);
  return { success: true, data };
}