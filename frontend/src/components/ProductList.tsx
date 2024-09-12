import React from 'react';
import { ProductCard } from './ui/ProductCard';
import { IProduct } from '@/lib/types';

interface IProductList {
  productList: IProduct[];
}

export const ProductList = ({ productList }: IProductList) => {
  return (
    <>
      {productList.map((product) => (
        <ProductCard
          key={product.name}
          name={product.name}
          description={product.description}
          price={product.price}
          imageSrc={product.imageSrc}
          category={product.category}
        />
      ))}
    </>
  );
};
