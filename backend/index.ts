import express, { Express, query, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conn from './config/db';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
  categoryId: number;
  description: string;
  image: string;
  price: number;
}

app.get('/', async (_, res: Response) => {
  res.send('Welcome to the one brew app');
});

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

    const products: IProduct[] = result.rows.map(
      (product) =>
        ({
          id: product.product_id,
          name: product.product_name,
          description: product.product_description,
          price: parseFloat(product.product_price),
          image: product.product_image,
          categoryId: product.category_id,
          categoryName: product.category_name,
        } as IProduct)
    );

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
      SELECT products.product_id, products.product_name, products.product_description, products.product_price, products.product_image, products.category_id, products.category_name, products.coffee_blend,
            json_agg(DISTINCT jsonb_build_object('size_name', sizes.size_name, 'size_price', sizes.size_price)) AS sizes,

            json_agg(DISTINCT jsonb_build_object('addon_type', addons.addon_name, 'items', 
         (SELECT json_agg(jsonb_build_object('item_name', addon_items.item_name, 'item_price', product_addon_items.price))
          FROM addon_items
          INNER JOIN product_addon_items ON addon_items.item_id = product_addon_items.addon_item_id
          WHERE product_addon_items.product_id = products.product_id AND addon_items.addon_id = addons.addon_id)
       )) as addons
      
      FROM products
      LEFT JOIN sizes ON sizes.product_id = products.product_id
      LEFT JOIN product_addon_items 
        ON products.product_id = product_addon_items.product_id
      LEFT JOIN addon_items 
        ON product_addon_items.addon_item_id = addon_items.item_id
      LEFT JOIN addons 
        ON addon_items.addon_id = addons.addon_id

      WHERE products.product_id = $1
      GROUP BY products.product_id;
      `;
    const result = await conn.query(query, [productId]);

    const product = result.rows.map((product) => {
      return {
        id: product.product_id,
        name: product.product_name,
        description: product.product_description,
        price: product.product_price,
        image: product.product_image,
        categoryId: product.category_id,
        categoryName: product.category_name,
        coffeeBlend: product.coffee_blend,
        sizes: product.sizes.map(
          (size: { size_name: string; size_price: number }) => ({
            name: size.size_name || '',
            price: size.size_price || 0,
          })
        ),
        addons: product.addons.map(
          (addon: {
            addon_type: string;
            items: [{ item_name: string; item_price: number }];
          }) => ({
            type: addon.addon_type || '',
            items: addon.items
              ? addon.items.map((item) => ({
                  name: item.item_name,
                  price: item.item_price,
                }))
              : [],
          })
        ),
      };
    });

    res.json(product[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
