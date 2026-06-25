"use server";

export async function flagAction(data: any) {
  console.log("flagAction called with:", data);
  return { success: true, data };
}