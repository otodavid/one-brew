'use client';

import { useEffect, useState } from 'react';
import { ProductList } from './ProductList';
import { IProduct } from '@/lib/types';
import { MenuSidebar } from './MenuSidebar';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import { convertToText } from '@/lib/helpers';

export const CategoryProducts = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const categories = useFetchCategories();

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

  return (
    <div className='lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32'>
      <MenuSidebar categories={categories} />

      <div>
        <h2 className='capitalize font-bold text-xl'>
          {convertToText(category)}
        </h2>
        <div className='grid gap-y-6 sm:gap-x-4 sm:grid-cols-cards-list pt-4 sm:pt-6'>
          <ProductList productList={products} />
        </div>
      </div>
    </div>
  );
};
