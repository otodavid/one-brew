import { UserInfo } from '../types';

export const queryAddUserInfo = ({
  email,
  firstName,
  lastName,
  phone,
  address,
  city,
  postalCode,
  province,
  country,
}: UserInfo) => {
  const query = `INSERT INTO user_info (
      email, first_name, last_name, phone, address, city, postal_code, province, country   
    ) VALUES(
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) RETURNING *`;

  const params = [
    email,
    firstName,
    lastName,
    phone,
    address,
    city,
    postalCode,
    province,
    country,
  ];

  return { query, params };
};

export const queryUpdateUserInfo = ({
  email,
  firstName,
  lastName,
  phone,
  address,
  city,
  postalCode,
  province,
  country,
}: UserInfo) => {
  const query = `UPDATE user_info 
    SET first_name = $2, last_name = $3, phone = $4, address = $5, city = $6, postal_code = $7, province = $8, country = $9   
    WHERE email = $1
    RETURNING *;`;

  const params = [
    email,
    firstName,
    lastName,
    phone,
    address,
    city,
    postalCode,
    province,
    country,
  ];

  return { query, params };
};

export const queryGetUserInfo = () => {
  return `SELECT * FROM user_info WHERE email = $1;`;
};

export const queryInsertNewUserCart = () => {
  return 'INSERT INTO cart(cart_owner, items) VALUES($1, $2) RETURNING *;';
};

export const queryAddToUserCart = () => {
  return `UPDATE cart SET items = items || $2::jsonb WHERE cart_owner = $1 RETURNING *;`;
};

export const queryMergeUserCart = () => {
  return `UPDATE cart SET items = items || $2 WHERE cart_owner = $1 RETURNING *;`;
};

export const queryDeleteFromUserCart = () => {
  return `UPDATE cart SET items = (
   CASE 
        WHEN (
            SELECT jsonb_agg(elem)
            FROM jsonb_array_elements(items) AS elem
            WHERE (elem ->> 'cartProductID')::uuid != $2
        ) IS NULL THEN '[]'::jsonb
        ELSE (
            SELECT jsonb_agg(elem)
            FROM jsonb_array_elements(items) AS elem
            WHERE (elem ->> 'cartProductID')::uuid != $2
        )
    END
  )
  WHERE cart_owner = $1
  RETURNING *
  `;
};

export const queryGetUserOrders = () => {
  return 'SELECT * FROM customer_order WHERE user_email = $1';
};


export const queryInsertNewOrder = () => {
  return `INSERT INTO customer_order (order_id, user_email, products, amount) VALUES ($1, $2, $3, $4)`
}