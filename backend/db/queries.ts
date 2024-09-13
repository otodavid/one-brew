import conn from '../config/db';

export const getCategories = async () => {
  const query = 'SELECT * FROM categories';
  const result = await conn.query(query);
  const categories = result.rows;
  // const result = await pool.query<ICategories>(query);
  // const categories: ICategories[] = result.rows;
  return categories;
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  const query =
    'SELECT * FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE c.name = $1';

  try {
    const result = await conn.query(query);
    return result.rows;
  } catch (err: any) {
    console.error(err.message);
  }
  // const query = `SELECT * FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = $1`;
  const result = await conn.query(query);
  // const result = await pool.query<IProduct>( query, [category]);
  const products = result.rows;
  return products;
};

export const getProductByID = async () => {
  const query = 'SELECT * FROM products p';
  const result = await conn.query(query);
  console.log(result.rows);
  return result.rows;
};
