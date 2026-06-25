'use client'

import { assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  addUserAddress,
  deleteUserAddress,
  getUserAddresses,
  updateUserAddress,
} from "@/actions/address.actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const emptyAddress = {
  fullName: "",
  phone: "",
  pincode: "",
  address: "",
  city: "",
  state: "",
};

const AddAddress = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [address, setAddress] = useState(emptyAddress);
  const [addresses, setAddresses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const loadAddresses = async () => {
    if (!userId) return;
    console.log(userId);
    
    const data = await getUserAddresses(userId);
    setAddresses(data.addresses || []);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      return setMessage("Please login first");
    }

    if (Object.values(address).some((value) => !value)) {
      return setMessage("All fields are required");
    }

    if (!/^\d{10}$/.test(address.phone)) {
      return setMessage("Phone number must be 10 digits");
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      return setMessage("Pincode must be 6 digits");
    }

    const data = editId
      ? await updateUserAddress(userId, editId, address)
      : await addUserAddress(userId, address);

    setAddresses(data.addresses || []);
    setAddress(emptyAddress);
    setEditId(null);
    setMessage(editId ? "Address updated" : "Address added");
  };

  const editAddress = (item) => {
    setEditId(item.id);
    setAddress({
      fullName: item.fullName || "",
      phone: item.phone || "",
      pincode: item.pincode || "",
      address: item.address || "",
      city: item.city || "",
      state: item.state || "",
    });
  };

  const removeAddress = async (addressId) => {
    if (!userId) return;
    const data = await deleteUserAddress(userId, addressId);
    setAddresses(data.addresses || []);
    if (editId === addressId) {
      setEditId(null);
      setAddress(emptyAddress);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [userId]);

  if (status === "loading") return null;

  return (
    <>
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row gap-12 justify-between">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <p className="text-2xl md:text-3xl text-gray-500">
              {editId ? "Update" : "Add"} Shipping <span className="font-semibold text-orange-600">Address</span>
            </p>

            <div className="space-y-3 max-w-sm mt-10">
              <input className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" type="text" name="fullName" placeholder="Full name" value={address.fullName} onChange={handleChange} />
              <input className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" type="text" name="phone" placeholder="Phone number" value={address.phone} onChange={handleChange} />
              <input className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" type="text" name="pincode" placeholder="Pin code" value={address.pincode} onChange={handleChange} />
              <textarea className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none" rows={4} name="address" placeholder="Address (Area and Street)" value={address.address} onChange={handleChange} />
              <div className="flex space-x-3">
                <input className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" type="text" name="city" placeholder="City/District/Town" value={address.city} onChange={handleChange} />
                <input className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} />
              </div>
            </div>

            {message && <p className="max-w-sm mt-3 text-sm text-orange-600">{message}</p>}

            <button type="submit" className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase">
              {editId ? "Update address" : "Save address"}
            </button>
          </form>

          <div className="max-w-2xl mt-12 space-y-3">
            <p className="text-xl font-medium text-gray-700">Saved Addresses</p>
            {addresses.map((item) => (
              <div key={item.id} className="border border-gray-500/20 p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-800">{item.fullName}</p>
                <p>{item.address}, {item.city}, {item.state} - {item.pincode}</p>
                <p>{item.phone}</p>
                <div className="flex gap-4 mt-2">
                  <button onClick={() => editAddress(item)} className="text-orange-600">Edit</button>
                  <button onClick={() => removeAddress(item.id)} className="text-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Image className="md:mr-16 mt-16 md:mt-0 object-contain" src={assets.my_location_image} alt="my_location_image" />
      </div>
    </>
  );
};

export default AddAddress;
