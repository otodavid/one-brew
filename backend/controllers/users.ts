import { Request, Response } from 'express';
import conn from '../config/db';
import { queryAddUserInfo } from '../queries/users';
import { transformUserData } from '../helpers/utils';

export async function addUserInfo(req: Request, res: Response) {
  try {
    const userInfo = req.body;

    const userExists = await conn.query(
      'SELECT EXISTS(SELECT 1 FROM user_info WHERE email=$1);',
      [userInfo.email]
    );

    if (userExists.rows[0].exists) {
      const existingUser = await conn.query(
        'SELECT * FROM user_info WHERE email=$1',
        [userInfo.email]
      );
      const newUserInfo = transformUserData(existingUser.rows[0]);
      res.status(200).json(newUserInfo);
    } else {
      const { query, params } = queryAddUserInfo(userInfo);
      const result = await conn.query(query, params);

      const newUserInfo = transformUserData(result.rows[0]);
      res.status(201).json(newUserInfo);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data:' });
  }
}
