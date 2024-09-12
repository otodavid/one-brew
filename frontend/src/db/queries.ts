import { NextResponse } from 'next/server';
import pool from './config';
import { ICategories, IProduct } from '@/lib/types';

export const getCategories = async () => {
  const query = 'SELECT * FROM categories';
  const result = await pool.query(query);
  const categories = result.rows;
  // const result = await pool.query<ICategories>(query);
  // const categories: ICategories[] = result.rows;
  return categories;
};

export const getCategoryProducts = async (category: string) => {
  const query =
    'SELECT * FROM products p INNER JOIN categories c ON p.category_id = c.category_id';
  // const query = `SELECT * FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = $1`;
  const result = await pool.query(query);
  // const result = await pool.query<IProduct>( query, [category]);
  const products = result.rows;
  return products;
};

export const getProductByID = async () => {
  const query = 'SELECT * FROM products p';
  const result = await pool.query(query);
  console.log(result.rows);
  return result.rows;
};
