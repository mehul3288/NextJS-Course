import { apiClient } from "@/lib/api-client";

export const getCart = (userId) => apiClient(`/cart?userId=${encodeURIComponent(userId)}`);

export const addCartItem = (userId, product) =>
  apiClient("/cart", {
    method: "POST",
    body: JSON.stringify({ userId, product }),
  });

export const updateCartItem = (userId, productId, quantity) =>
  apiClient(`/cart/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ userId, quantity }),
  });

export const removeCartItem = (userId, productId) =>
  apiClient(`/cart/${productId}`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });
