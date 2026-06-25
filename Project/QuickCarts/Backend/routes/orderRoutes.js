const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = 'mysecretkey';
const ORDERS_URL = 'http://localhost:4500/orders';
const CART_URL = 'http://localhost:4500/cart';

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

const getAllOrders = async () => {
  const response = await axios.get(ORDERS_URL);

  return response.data || {};
};

const saveOrders = async (orders) => {
  const response = await axios.put(ORDERS_URL, orders);

  return response.data;
};

const getAllCarts = async () => {
  const response = await axios.get(CART_URL);

  return response.data || {};
};

const saveCart = async (cart) => {
  const response = await axios.put(CART_URL, cart);

  return response.data;
};

const createOrderId = () => `${Date.now()}${Math.random().toString(16).slice(2)}`;

const getOrderAmount = (items) =>
  items.reduce((amount, item) => {
    const itemAmount = Number(item.totalPrice);

    if (!Number.isNaN(itemAmount)) {
      return amount + itemAmount;
    }

    const price = Number(item.offerPrice || item.price || 0);
    const quantity = Number(item.quantity || 1);

    return amount + price * quantity;
  }, 0);

router.get('/', async (req, res) => {
  try {
    const orders = await getAllOrders();
    const allOrders = Object.values(orders)
      .flat()
      .sort((firstOrder, secondOrder) => secondOrder.date - firstOrder.date);

    return res.json({
      orders: allOrders
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/my-orders', async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const orders = await getAllOrders();

    return res.json({
      userId,
      orders: orders[userId] || []
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const orderData = req.body.orders || {};
    const orderItems = orderData.items;

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const orders = await getAllOrders();
    const userOrders = orders[userId] || [];
    const totalPrice = Number(orderData.totalPrice);
    const newOrder = {
      id: createOrderId(),
      userId,
      items: orderItems,
      address: orderData.address || null,
      totalPrice: Number.isNaN(totalPrice) ? getOrderAmount(orderItems) : totalPrice,
      amount: Number.isNaN(totalPrice) ? getOrderAmount(orderItems) : totalPrice,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      date: Date.now()
    };

    orders[userId] = [newOrder, ...userOrders];
    await saveOrders(orders);

    const cart = await getAllCarts();
    cart[userId] = [];
    await saveCart(cart);

    return res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      orders: orders[userId],
      cart: cart[userId]
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
