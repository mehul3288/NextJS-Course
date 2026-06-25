import { apiClient } from "@/lib/api-client";

export const getMyOrders = (userId) => apiClient(`/orders/my-orders?userId=${encodeURIComponent(userId)}`);

export const getAllOrders = () => apiClient(`/orders`);

export const placeOrder=(userId,orders,totalPrice,address)=>apiClient(`/orders?userId=${encodeURIComponent(userId)}`,{
    method:"POST",
    body:JSON.stringify({userId, orders:{items:orders,totalPrice,address}})
})
