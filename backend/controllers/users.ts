import { Request, Response } from 'express';
import conn from '../config/db';
import {
  queryAddToUserCart,
  queryAddUserInfo,
  queryDeleteFromUserCart,
  queryGetUserInfo,
  queryGetUserOrders,
  queryInsertNewUserCart,
  queryUpdateUserInfo,
} from '../queries/users';
import { transformOrderData, transformUserData } from '../helpers/utils';

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

export async function updateUserInfo(req: Request, res: Response) {
  try {
    const updatedUserInfo = req.body;

    const userExists = await conn.query(
      'SELECT EXISTS(SELECT 1 FROM user_info WHERE email=$1);',
      [updatedUserInfo.email]
    );

    if (userExists.rows[0].exists) {
      const { query, params } = queryUpdateUserInfo(updatedUserInfo);
      const result = await conn.query(query, params);

      const newUserInfo = transformUserData(result.rows[0]);
      res.status(200).json(newUserInfo);
    } else {
      res.status(400).json({ message: 'User does not exist. Update Failed' });
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data:' });
  }
}

export async function getUserInfo(req: Request, res: Response) {
  try {
    const { email } = req.query;

    const userExists = await conn.query(
      'SELECT EXISTS(SELECT 1 FROM user_info WHERE email=$1);',
      [email]
    );

    if (userExists.rows[0].exists) {
      const query = queryGetUserInfo();
      const result = await conn.query(query, [email]);

      const newUserInfo = transformUserData(result.rows[0]);
      res.status(200).json(newUserInfo);
    } else {
      res.status(400).json({ message: 'User does not exist' });
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data:' });
  }
}

export async function addToUserCart(req: Request, res: Response) {
  const { email, item } = req.body;

  try {
    const isUserCartExists = await conn.query(
      'SELECT EXISTS(SELECT 1 FROM cart WHERE cart_owner = $1);',
      [email]
    );

    if (isUserCartExists.rows[0].exists) {
      const query = queryAddToUserCart();

      const result = await conn.query(query, [email, JSON.stringify(item)]);
      const data = result.rows[0];

      res.status(200).json(data);
    } else {
      const query = queryInsertNewUserCart();
      const result = await conn.query(query, [email, JSON.stringify(item)]);

      const data = result.rows[0];

      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error inserting data' });
  }
}

export async function mergeUserCart(req: Request, res: Response) {
  const { userEmail, cart } = req.body;

  try {
    const isUserCartExists = await conn.query(
      'SELECT EXISTS(SELECT 1 FROM cart WHERE cart_owner = $1);',
      [userEmail]
    );

    if (isUserCartExists.rows[0].exists) {
      const query = queryAddToUserCart();

      const result = await conn.query(query, [userEmail, JSON.stringify(cart)]);
      const newCart = result.rows[0];

      res.status(200).json(newCart);
    } else {
      const query = queryInsertNewUserCart();
      const result = await conn.query(query, [userEmail, JSON.stringify(cart)]);

      const newCart = result.rows[0];

      res.status(200).json(newCart);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error inserting data' });
  }
}

export async function DeleteFromUserCart(req: Request, res: Response) {
  const { email, cartProductID } = req.body;

  try {
    const isUserCartExists = await conn.query(
      'SELECT EXISTS(SELECT 1 FROM cart WHERE cart_owner = $1);',
      [email]
    );

    if (isUserCartExists.rows[0].exists) {
      const query = queryDeleteFromUserCart();

      const result = await conn.query(query, [email, cartProductID]);
      const newCart = result.rows[0];

      res.status(200).json(newCart);
    } else {
      res.status(400).json({ message: 'User Cart does not exists' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Error deleting data' });
  }
}

export const getUserOrders = async (req: Request, res: Response) => {
  const { email } = req.query;
  const query = queryGetUserOrders();

  try {
    const result = await conn.query(query, [email]);
    const orders = result.rows;

    res.status(200).json(transformOrderData(orders));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving order' });
  }
};
