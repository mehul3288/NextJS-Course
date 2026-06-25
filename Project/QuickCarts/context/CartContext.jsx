"use client"
import { createContext, useContext, useState } from "react";

const CartContext=createContext();

export const useCart=()=>{
    return useContext(CartContext)
}

export const CartProvider=({children})=>{
    const [total,setTotal]=useState({items:0,price:0});
    // const [items,setTotal]=useState({items:0,price:0});
    const [items,setItems]=useState([]);
    const updateOrderSummary=(cartItems)=>{
        setItems(cartItems)
        const {totalItems,totalPrice}=cartItems.reduce((totalObj,item)=>{
            totalObj.totalItems+=item.quantity;
            totalObj.totalPrice+=(item.offerPrice*item.quantity);
            return totalObj;
        },{totalItems:0,totalPrice:0})
        setTotal({items:totalItems,price:totalPrice});
    }

    return (
        <CartContext.Provider value={{total,updateOrderSummary,setItems,items}}>
            {children}
        </CartContext.Provider>
    )
}