"use server";

export async function addProductAction(prevState, formData) {
  try {
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      return { success: false, error: data.message || "Failed to add product" };
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, error: error.message || "Something went wrong" };
  }
}
