export const queryAllCategories = () => {
  return 'SELECT * FROM categories';
};

export const queryProductsByCategoryId = () => {
  return `SELECT product.id, product.name, product.image_url, product.description, product.price, categories.id AS category_id, categories.name AS category_name, categories.type
      FROM product 
      INNER JOIN categories ON product.category_id=categories.id 
      WHERE categories.id=$1`;
};

export const queryAllProducts = () => {
  return `SELECT
      product.id,
      product.name,
      product.image_url,
      product.description,
      product.price,
      categories.id AS category_id,
      categories.name AS category_name,
      categories.type
FROM
      product
      INNER JOIN categories ON product.category_id = categories.id;`;
};

export const queryProductById = () => {
  return `SELECT
  product.id,
  product.name,
  product.description,
  product.price,
  product.image_url,
  categories.name AS category_name,
  categories.type,

  COALESCE(
  json_agg (
    DISTINCT jsonb_build_object ('name', size.name, 'price', size.price)
  ) FILTER (
      WHERE
        size.id IS NOT NULL
    ), '[]'
  ) AS sizes,
 
  COALESCE(
    json_agg (
      DISTINCT jsonb_build_object (
        'addon_type_id',
        addon_type.id,
        'addon_type_name',
        addon_type.name,
        'items',
        (
          SELECT
            json_agg (
              json_build_object (
                'item_id',
                addon_item.item_id,
                'item_name',
                addon_item.name,
                'item_price',
                addon_item.price
              )
            )
          FROM
            addon_item
          WHERE
            addon_item.addon_type_id = addon_type.id
        )
      )
    ) FILTER (
      WHERE
        addon_type.id IS NOT NULL
    ),
    '[]'
  ) AS addons
FROM
  product
  INNER JOIN categories ON product.category_id = categories.id
  LEFT JOIN product_addon ON product.id = product_addon.product_id
  LEFT JOIN addon_type ON product_addon.addon_type_id = addon_type.id
  LEFT JOIN size ON size.product_id = product.id
  WHERE product.id = $1
GROUP BY
  product.id,
  categories.name,
  categories.type;`;
};