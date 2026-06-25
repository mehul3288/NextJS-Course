"use client"
import { getUserAddresses } from "@/actions/address.actions";
import { placeOrder } from "@/actions/order.actions";
// import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderSummary = () => {
  const { total,items } = useCart();
  const router = useRouter();
  // const { currency, router, getCartCount, getCartAmount } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addNotSelectedError,setAddNotSelectedError]=useState(false);

  const [userAddresses, setUserAddresses] = useState([]);
  const { data: session, status } = useSession()
  const userId = session?.user?.id;
  console.log(userId);
  
  const fetchUserAddresses = async () => {

    if(!userId) return;
    if(userAddresses.length>0) return;
    console.log();
    
    const res = await getUserAddresses(userId);
    console.log(res);
    
    setUserAddresses(res.addresses);
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
    setAddNotSelectedError(false)
  };

  const createOrder = async () => {
    if(!selectedAddress){
      setAddNotSelectedError(true)
      return;
    } 
    const orders=[...items];
    
    const orderWithEachInidvidualItemTotal=orders.map(item=>({...item,totalPrice:(((item.quantity*item.offerPrice)+Math.floor(item.quantity*item.offerPrice*0.02)).toFixed(2))}));
    const data=await placeOrder(userId,[...orderWithEachInidvidualItemTotal],(total.price + Math.floor(total.price * 0.02)).toFixed(2),selectedAddress);
    redirect("/order-placed");
  }

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => {fetchUserAddresses();setIsDropdownOpen(!isDropdownOpen)}}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.address}, {address.city}, {address.state} - {address.pincode}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div> */}

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items </p>
            <p className="text-gray-800">{total.items}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">${Math.floor(total.price * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>${(total.price + Math.floor(total.price * 0.02)).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700">
        Place Order
      </button>

      {addNotSelectedError && (
        <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-lg px-md py-sm text-body-sm font-body-sm">
              <span className="material-symbols-outlined text-[18px] shrink-0">Please select a address</span>

            </div>
      )}

    </div>
  );
};

export default OrderSummary;