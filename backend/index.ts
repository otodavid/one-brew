import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conn from './config/db';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript');
});

// Sample route to fetch products
app.get('/products', async (req: Request, res: Response) => {
  try {
    const result = await conn.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
