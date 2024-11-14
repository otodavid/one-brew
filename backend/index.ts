import express, {
  Express,
  NextFunction,
  query,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
} from './controllers/products';
import { handleConfirmTransaction, handlePayment } from './controllers/stripe';
import {
  addToUserCart,
  addUserInfo,
  getUserCart,
  getUserInfo,
  updateUserInfo,
} from './controllers/users';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());

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

app.get('/user/cart', addToUserCart);

app.listen(port, () => {
  console.log(`Backend server is running`);
});
