import { UserInfo } from "../types";

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
  