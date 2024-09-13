import express, { Express, query, Request, Response } from 'express';
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
    const result = await conn.query(
      'SELECT * FROM products p INNER JOIN categories c ON p.category_id = c.category_id'
    );
    res.json(result.rows);
    console.log(result.rows);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.get('/products/:category_name', async (req: Request, res: Response) => {
  try {
    const query =
      'SELECT * FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE c.category_name = $1';

    const { category_name } = req.params;

    const result = await conn.query(query, [category_name]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
