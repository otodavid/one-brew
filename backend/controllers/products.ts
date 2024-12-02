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
  querySearchProducts,
  querySearchSuggestions,
} from '../queries/products';

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { page = 1, limit = 1 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const query = queryAllProducts();
    const result = await conn.query(query, [Number(limit), offset]);

    const products = result.rows.map(transformProductSummaryData);

    const totalCountResult = await conn.query('SELECT COUNT(*) FROM product');
    const totalCount = parseInt(totalCountResult.rows[0].count);
    const hasMore = offset + Number(limit) < totalCount;

    res.json({ data: products, hasMore });
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
    console.error('Error in getAllCategories:', err.message);
    res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' });
  }
}

export async function getProductsByCategoryId(req: Request, res: Response) {
  try {
    const query = queryProductsByCategoryId();

    const { id } = req.params;
    const result = await conn.query(query, [id]);

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

export async function getSearchedProducts(req: Request, res: Response) {
  try {
    const { term, page = 1, limit = 1 } = req.query;
    const limitValue = Number(limit); //3
    const offset = (Number(page) - 1) * limitValue;

    const query = querySearchProducts();
    const result = await conn.query(query, [term]);

    const products = result.rows.map(transformProductSummaryData);

    const totalCount = result.rowCount ? result.rowCount : 0;
    const hasMore = offset + Number(limit) < totalCount;

    const startIndex = (Number(page) - 1) * limitValue;
    const endIndex = Number(page) * limitValue;

    res
      .status(200)
      .json({ data: products.slice(startIndex, endIndex), hasMore });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Error searching for data' });
  }
}

export async function getSearchSuggestions(req: Request, res: Response) {
  try {
    const { term } = req.query;
    const query = querySearchSuggestions();
    const result = await conn.query(query, [term]);

    const suggestions = result.rows.map((suggestion) => {
      return { id: suggestion.id, name: suggestion.name };
    });

    res.status(200).json(suggestions);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Error searching for data' });
  }
}
