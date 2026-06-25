import { apiClient } from "@/lib/api-client";

export const getUserAddresses = (userId) =>  
  apiClient(`/address?userId=${encodeURIComponent(userId)}`);

export const addUserAddress = (userId, data) =>
  apiClient("/address", {
    method: "POST",
    body: JSON.stringify({ userId, data }),
  });

export const updateUserAddress = (userId, addressId, data) =>
  apiClient(`/address/${addressId}`, {
    method: "PATCH",
    body: JSON.stringify({ userId, data }),
  });

export const deleteUserAddress = (userId, addressId) =>
  apiClient(`/address/${addressId}`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });
