import express, { Express, query, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
} from './controllers/products';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', async (_, res: Response) => {
  res.json({ message: 'Welcome to the one brew app' });
});

app.get('/categories', getAllCategories);

app.get('/products', getAllProducts);

app.get('/products/:categoryId', getProductsByCategoryId);

app.get('/products/:productId', getProductById);

app.listen(port, () => {
  console.log(`Backend server is running`);
});
