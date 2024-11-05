import { Request, Response } from 'express';
import { queryAddUserInfo } from '../queries';
import conn from '../config/db';

export async function addUserInfo(req: Request, res: Response) {
  try {
    const userInfo = req.body;

    const { query, params } = queryAddUserInfo(userInfo);
    const result = await conn.query(query, params);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data:' });
  }
}
