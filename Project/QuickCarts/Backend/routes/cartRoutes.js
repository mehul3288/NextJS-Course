const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = 'mysecretkey';
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

const getAllCarts = async () => {
  const response = await axios.get(CART_URL);

  return response.data || {};
};

const getCart = async (userId) => {
  const cart = await getAllCarts();

  return cart[userId] || [];
};

const saveCart = async (cart) => {
  const response = await axios.put(CART_URL, cart);

  return response.data;
};

router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const userCart = await getCart(userId);

    return res.json({
      userId,
      cart: userCart
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { product } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!product || !product._id) {
      return res.status(400).json({ message: 'Product is required' });
    }

    const cart = await getAllCarts();
    
    
    const userCart = cart[userId] || [];
    const item = userCart.find((cartItem) => cartItem._id === product._id);

    if (item) {
      item.quantity += 1;
    } else {
        product.quantity=1;
      userCart.push(product);
    }
    
    cart[userId] = userCart;
    await saveCart(cart);

    return res.status(201).json({
      message: 'Product added to cart',
      cart: userCart
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.patch('/:productId', async (req, res) => {
  try {
    // const prod
    const userId = getUserId(req);
    
    const { productId } = req.params;
    const quantity = Number(req.body.quantity);

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const cart = await getAllCarts();
    const userCart = cart[userId] || [];
    // console.log("heyyy",cart,userId);
    
    
    const item = userCart.find((cartItem) => cartItem._id === productId);
    console.log(item,productId);
    
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    item.quantity = quantity;
    cart[userId] = userCart;
    console.log("heyyy theres",cart);
    
    await saveCart(cart);

    return res.json({
      message: 'Cart quantity updated',
      cart: userCart
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const cart = await getAllCarts();
    const userCart = cart[userId] || [];
    const updatedCart = userCart.filter((cartItem) => cartItem._id !== productId);

    cart[userId] = updatedCart;
    await saveCart(cart);

    return res.json({
      message: 'Product removed from cart',
      cart: updatedCart
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
