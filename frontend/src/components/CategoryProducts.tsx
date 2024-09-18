'use client';

import { useEffect, useState } from 'react';
import { ProductList } from './ProductList';

export const CategoryProducts = ({ category }: { category: string }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/categories/${category}`);
        const products = await res.json();

        setProducts(products);
      } catch (err) {
        console.log('could not fetch data');
      }
    };

    getProducts();
  }, []);
  console.log(products);

  return (
    <>
      <div className='grid grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] gap-y-6 gap-x-4 pt-4'>
        <ProductList productList={products} />
      </div>
    </>
  );
};
