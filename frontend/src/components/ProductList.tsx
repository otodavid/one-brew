import React from 'react';
import { ProductCard } from './ui/ProductCard';
import { ProductSummary } from '@/lib/types';

interface ProductList {
  productList: ProductSummary[];
}

export const ProductList = ({ productList }: ProductList) => {
  return (
    <>
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          categoryName={product.categoryName}
          categoryType={product.categoryType}
        />
      ))}
    </>
  );
};
