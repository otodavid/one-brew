import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
} from './controllers/products';
import {
  handleAddUserOrder,
  handleConfirmTransaction,
  handlePayment,
} from './controllers/stripe';
import {
  addToUserCart,
  addUserInfo,
  DeleteFromUserCart,
  getUserInfo,
  getUserOrders,
  mergeUserCart,
  updateUserInfo,
} from './controllers/users';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

// Middleware
app.use(cors(corsOptions));

app.get('/', async (_, res: Response) => {
  res.json({ message: 'Welcome to the one brew app' });
});

// have webhook here so that express.json() does not interfer with express.raw
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleConfirmTransaction
);

app.use(express.json());

app.post('/process-payment', handlePayment);

app.get('/categories', getAllCategories);

app.get('/products', getAllProducts);

app.get('/products/c/:categoryId', getProductsByCategoryId);

app.get('/products/:productId', getProductById);

app.get('/user/me', getUserInfo);

app.post('/user/add', addUserInfo);

app.put('/user/update', updateUserInfo);

app.post('/user/cart/add', addToUserCart);

app.post('/user/cart/merge', mergeUserCart);

app.put('/user/cart/delete-item', DeleteFromUserCart);

app.get('/user/orders', getUserOrders);

app.post('/user/orders/add', handleAddUserOrder);

app.listen(port, () => {
  console.log(`Backend server is running`);
});
