const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { uploadImage } = require('../cloudinary');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const loadProducts = () => {
  const assetsPath = path.join(__dirname, '../assets/assets.js');
  const assetsFile = fs.readFileSync(assetsPath, 'utf8');
  const arrayStartToken = 'export const productsDummyData =';
  const arrayStart = assetsFile.indexOf(arrayStartToken);

  if (arrayStart === -1) {
    throw new Error('productsDummyData array not found in assets.js');
  }

  const firstBracket = assetsFile.indexOf('[', arrayStart);
  let depth = 0;
  let arrayEnd = -1;

  for (let index = firstBracket; index < assetsFile.length; index += 1) {
    const character = assetsFile[index];

    if (character === '[') {
      depth += 1;
    }

    if (character === ']') {
      depth -= 1;
    }

    if (depth === 0) {
      arrayEnd = index + 1;
      break;
    }
  }

  if (firstBracket === -1 || arrayEnd === -1) {
    throw new Error('Unable to read productsDummyData array from assets.js');
  }

  const productsArray = assetsFile.slice(firstBracket, arrayEnd);

  return Function(`"use strict"; return (${productsArray});`)();
};

const products = loadProducts();

const createProductId = () => {
  return `${Date.now()}${Math.random().toString(16).slice(2)}`;
};

router.get('/', (req, res) => {
  res.json({
    success: true,
    products
  });
});

router.get('/:id', (req, res) => {
  const product = products.find((item) => {
    return item._id === req.params.id || String(item.id) === req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  return res.json({
    success: true,
    product
  });
});

const saveProducts = (updatedProducts) => {
  const assetsPath = path.join(__dirname, '../assets/assets.js');
  const assetsFile = fs.readFileSync(assetsPath, 'utf8');
  const arrayStartToken = 'export const productsDummyData =';
  const arrayStart = assetsFile.indexOf(arrayStartToken);

  if (arrayStart === -1) {
    throw new Error('productsDummyData array not found in assets.js');
  }

  const firstBracket = assetsFile.indexOf('[', arrayStart);
  let depth = 0;
  let arrayEnd = -1;

  for (let index = firstBracket; index < assetsFile.length; index += 1) {
    const character = assetsFile[index];

    if (character === '[') {
      depth += 1;
    }

    if (character === ']') {
      depth -= 1;
    }

    if (depth === 0) {
      arrayEnd = index + 1;
      break;
    }
  }

  if (firstBracket === -1 || arrayEnd === -1) {
    throw new Error('Unable to write productsDummyData array to assets.js');
  }

  const newContent = assetsFile.slice(0, firstBracket) + JSON.stringify(updatedProducts, null, 2) + assetsFile.slice(arrayEnd);
  fs.writeFileSync(assetsPath, newContent, 'utf8');
};

router.post('/', upload.array('images', 4), async (req, res) => {
  try {
    const { name, description, price, offerPrice, category, userId } = req.body;

    if (!name || !description || price === undefined || offerPrice === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'name, description, price, offerPrice and category are required'
      });
    }

    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file && file.size > 0) {
          const mockFile = {
            arrayBuffer: () => Promise.resolve(file.buffer),
            type: file.mimetype
          };
          const url = await uploadImage(mockFile);
          imageUrls.push(url);
        }
      }
    }

    const newProduct = {
      _id: req.body._id || createProductId(),
      userId: userId || 'user_dummy',
      name,
      description,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image: imageUrls,
      category,
      date: req.body.date ? Number(req.body.date) : Date.now(),
      __v: req.body.__v ? Number(req.body.__v) : 0
    };

    products.push(newProduct);
    saveProducts(products);

    return res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
});

module.exports = router;
