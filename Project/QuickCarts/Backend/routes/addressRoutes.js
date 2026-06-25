const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = 'mysecretkey';
const ADDRESS_URL = 'http://localhost:4500/address';

const getUserId = (req) => {
  if (req.body.userId || req.query.userId) {
    return req.body.userId || req.query.userId;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded.userId || decoded.id;
  } catch (error) {
    return null;
  }
};

const getAllAddress = async () => {
  const response = await axios.get(ADDRESS_URL);

  return response.data || {};
};

const saveAddress = async (address) => {
  const response = await axios.put(ADDRESS_URL, address);

  return response.data;
};

const createAddressId = () => `${Date.now()}${Math.random().toString(16).slice(2)}`;

router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);

    console.log(userId);
    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const addresses = await getAllAddress();

    return res.json({
      userId,
      addresses: addresses[userId] || []
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    const addressData = req.body.data || req.body;
    const { fullName, phone, pincode, address, city, state } = addressData;

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!fullName || !phone || !pincode || !address || !city || !state) {
      return res.status(400).json({ message: 'Please provide all the details' });
    }

    const addresses = await getAllAddress();
    const userAddresses = addresses[userId] || [];
    const newAddress = {
      id: createAddressId(),
      fullName,
      phone,
      pincode,
      address,
      city,
      state
    };

    userAddresses.push(newAddress);
    addresses[userId] = userAddresses;
    await saveAddress(addresses);

    return res.status(201).json({
      message: 'Address added successfully',
      address: newAddress,
      addresses: userAddresses
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.patch("/:addressId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { addressId } = req.params;
    const addressData = req.body.data || req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const addresses = await getAllAddress();
    const userAddresses = addresses[userId] || [];
    const userAddress = userAddresses.find((item) => item.id === addressId);

    if (!userAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    Object.assign(userAddress, addressData, { id: addressId });
    addresses[userId] = userAddresses;
    await saveAddress(addresses);

    return res.json({
      message: 'Address updated successfully',
      address: userAddress,
      addresses: userAddresses
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete("/:addressId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { addressId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const addresses = await getAllAddress();
    const userAddresses = addresses[userId] || [];
    const updatedAddresses = userAddresses.filter((item) => item.id !== addressId);

    addresses[userId] = updatedAddresses;
    await saveAddress(addresses);

    return res.json({
      message: 'Address deleted successfully',
      addresses: updatedAddresses
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
