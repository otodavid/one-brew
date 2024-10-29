'use client';

import { ProductList } from './ProductList';
import { ProductSummary } from '@/lib/types';
import { MenuSidebar } from './MenuSidebar';
import { convertToText } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';

interface Props {
  categoryName: string;
  categoryId: string;
}

export const CategoryProducts = ({ categoryName, categoryId }: Props) => {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products/c/${categoryId}`);
      return await res.json();
    },
  });

  if (isError && !isLoading) {
    return <div>An Error occured</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isLoading && products && (
        <>
          <h2 className='capitalize font-bold text-xl'>
            {convertToText(categoryName)}
          </h2>
          <div className='grid gap-y-6 sm:gap-x-4 sm:grid-cols-cards-list pt-4 sm:pt-6'>
            <ProductList productList={products} />
          </div>
        </>
      )}
    </div>
  );
};
