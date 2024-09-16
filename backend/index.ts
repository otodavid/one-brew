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

interface CData {
  id: number;
  name: string;
  image: string;
  type: string;
}

interface IProduct {
  id: number;
  name: string;
  categoryName: string;
  description: string;
  image: string;
  price: number;
}

app.get('/categories', async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM categories';
    const result = await conn.query(query);

    const categories: CData[] = result.rows.map((category) => ({
      id: category.category_id,
      name: category.category_name,
      image: category.category_image,
      type: category.category_type,
    }));

    res.json(categories);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.get('/categories/:categoryName', async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM products WHERE products.category_name=$1';
    const { categoryName } = req.params;
    const result = await conn.query(query, [categoryName]);

    const products: IProduct[] = result.rows.map((product: any) => ({
      id: product.product_id,
      name: product.product_name,
      description: product.product_description,
      price: product.product_price,
      image: product.product_image,
      categoryId: product.category_id,
      categoryName: product.category_name,
    }));

    res.json(products);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products', async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM products';
    const result = await conn.query(query);

    res.json(result.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const query = `
      SELECT products.product_id, products.product_name, products.product_description, products.product_price, products.product_image, products.category_id, products.category_name,
             json_agg(DISTINCT jsonb_build_object('size_name', sizes.size_name, 'size_price', sizes.size_price)) AS sizes,
             json_agg(DISTINCT jsonb_build_object('addon_name', addons.addon_name, 'addon_price', addons.addon_price)) AS addons
      FROM products
      LEFT JOIN sizes ON sizes.product_id = products.product_id
      LEFT JOIN addons ON addons.product_id = products.product_id
      WHERE products.product_id = $1
      GROUP BY products.product_id;
      `;
    const result = await conn.query(query, [productId]);

    const product = result.rows.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      description: product.product_description,
      price: product.product_price,
      image: product.product_image,
      categoryId: product.category_id,
      categoryName: product.category_name,
      sizes: product.sizes.map(
        (size: { size_name: string; size_price: number }) => ({
          name: size.size_name,
          price: size.size_price,
        })
      ),
      addons: product.addons.map(
        (addon: { addon_name: string; addon_price: number }) => ({
          name: addon.addon_name,
          price: addon.addon_price,
        })
      ),
    }));

    console.log(product);

    res.json(product[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
