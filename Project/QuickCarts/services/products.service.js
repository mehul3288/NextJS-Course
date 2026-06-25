import { apiClient } from "@/lib/api-client";

export async function getAllProducts() {
  return await apiClient("/products");
}

export async function getProductById(id) {
  return await apiClient(`/products/${id}`);
}
