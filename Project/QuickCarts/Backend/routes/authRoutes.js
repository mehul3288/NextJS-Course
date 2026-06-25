const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const router = express.Router();

const SECRET_KEY = 'mysecretkey';

const DB_URL = 'http://localhost:4500/users';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const existingUsers = await axios.get(
      `${DB_URL}?email=${email}`
    );

    console.log(req.body);


    if (existingUsers.data.length > 0) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword
    };

    const response = await axios.post(DB_URL, newUser);

    res.status(201).json({
      message: 'Signup successful',
      user: response.data
    });

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.get(
      `${DB_URL}?email=${email}`
    );

    const user = response.data[0];

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    res.json({
      message: 'Login successful',
      token,
      email: user.email,
      name: user.name,
      id: user.id,
      role: user.role || 'user'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

module.exports = router;
