require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');

const authMiddleware = require('./middleware/authMiddleware');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/address', addressRoutes);
app.use('/orders', orderRoutes);


app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
