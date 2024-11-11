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
  const query = `SELECT * FROM user_info 
      WHERE email = $1;`;

  return query;
};

export const queryGetUserCart = () => {
  return 'SELECT * FROM cart WHERE cart_owner = $1;';
};

export const queryInsertEmptyUserCart = () => {
  return "INSERT INTO cart(cart_owner, items) VALUES($1, '[]') RETURNING *;";
};
