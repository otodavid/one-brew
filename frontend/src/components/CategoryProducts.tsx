'use client';

import { ProductList } from './ProductList';
import { convertToText } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { MenuCategoryProductsSkeletonLoader } from './Loaders/MenuCategoryProductsSkeletonLoader';
import axios from 'axios';
import { ProductSummary } from '@/lib/types';

interface Props {
  categoryName: string;
  categoryId: string;
}

export const CategoryProducts = ({ categoryName, categoryId }: Props) => {
  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: async (): Promise<ProductSummary[]> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${categoryId}/products`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      return data;
    },
  });

  if (isError && !isLoading) {
    throw new Error(error.message || 'An unexpected error occurred');
  }

  if (isLoading) {
    return <MenuCategoryProductsSkeletonLoader />;
  }

  return (
    <div>
      {!isLoading && products && (
        <>
          <h2 className='capitalize font-bold text-xl'>
            {convertToText(categoryName)}
          </h2>
          <div className='pt-4 sm:pt-6'>
            <ProductList productList={products} />
          </div>
        </>
      )}
    </div>
  );
};
