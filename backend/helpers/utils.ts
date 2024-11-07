import { Categories, Product, ProductSummary, UserInfo } from '../types';

// transform data from pascal to camelCase
export function transformProductSummaryData(data: any): ProductSummary {
  return {
    id: data.id,
    name: data.name,
    image: data.image_url,
    description: data.description,
    price: parseFloat(data.price),
    categoryName: data.category_name,
    categoryType: data.type,
  };
}

export function transformCategoryData(data: any): Categories {
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    type: data.type,
  };
}

export function transformProductData(data: any): Product {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    image: data.image_url,
    categoryName: data.category_name,
    categoryType: data.type,
    sizes: data.sizes.map((size: { name: string; price: number }) => ({
      name: size.name,
      price: size.price,
    })),
    addons: data.addons.map(
      (addon: {
        addon_type_id: number;
        addon_type_name: string;
        items: [{ item_id: number; item_name: string; item_price: number }];
      }) => ({
        id: addon.addon_type_id,
        type: addon.addon_type_name,
        items:
          addon.items.map((item) => ({
            id: item.item_id,
            name: item.item_name,
            price: item.item_price,
          })) ?? [],
      })
    ),
  };
}

export function removeHyphens(text: string) {
  return text.replaceAll('-', ' ').toLowerCase();
}

export function transformUserData(data: any): UserInfo {
  return {
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    phone: data.phone,
    address: data.address,
    city: data.city,
    postalCode: data.postal_code,
    province: data.province,
    country: data.country,
  };
}
