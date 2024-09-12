// 'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { convertToLink, sanitizeData } from '@/lib/helpers';
import data from '@/lib/data.json';
import { IProduct } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategoryProducts } from '@/db/queries';

interface IParams {
  params: { category: string };
}

export default async function Page({ params: { category } }: IParams) {
  const products = await getCategoryProducts(sanitizeData(category));

  return (
    <section className='px-4 py-6'>
      <h2 className='capitalize font-bold text-xl'>{sanitizeData(category)}</h2>

      <div className='grid grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] gap-y-6 gap-x-4 pt-4'>
        {products.map(
          ({
            product_id,
            product_name,
            product_image,
            product_price,
            product_description,
          }) => (
            <Link
              href={`${category}/${product_id}/${convertToLink(product_name)}`}
              key={product_id}
            >
              <ProductCard
                id={product_id}
                image={product_image}
                name={product_name}
                description={product_description}
                price={product_price}
                category={category}
              />
            </Link>
          )
        )}
      </div>
    </section>
  );
}
