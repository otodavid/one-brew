import { Request, Response } from 'express';
import conn from '../config/db';
import {
  transformCategoryData,
  transformProductSummaryData,
  transformProductData,
} from '../helpers/utils';
import {
  queryAllCategories,
  queryAllProducts,
  queryProductById,
  queryProductsByCategoryId,
} from '../queries';

export async function getAllProducts(req: Request, res: Response) {
  try {
    const query = queryAllProducts();
    const result = await conn.query(query);

    const products = result.rows.map(transformProductSummaryData);

    res.json(products);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const query = queryAllCategories();
    const result = await conn.query(query);

    const categories = result.rows.map(transformCategoryData);

    res.json(categories);
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function getProductsByCategoryId(req: Request, res: Response) {
  try {
    const query = queryProductsByCategoryId();

    const { categoryId } = req.params;
    const result = await conn.query(query, [categoryId]);

    const products = result.rows.map(transformProductSummaryData);

    res.json(products);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const query = queryProductById();
    const result = await conn.query(query, [productId]);

    const product = result.rows.map(transformProductData)[0];

    res.json(product);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
