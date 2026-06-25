"use server";

export async function highlightAction(data: any) {
  console.log("highlightAction called with:", data);
  return { success: true, data };
}