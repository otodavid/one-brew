'use client';

import { ProductsSkeletonLoader } from '@/components/Loaders/ProductsSkeletonLoader';
import { MenuSidebar } from '@/components/MenuSidebar';
import { ProductList } from '@/components/ProductList';
import { ProductSummary } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AllProducts = () => {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState<string | null>('');
  const isSearching = term !== null;

  useEffect(() => {
    const params = searchParams.get('term');
    setTerm(params);
  }, [searchParams]);

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<ProductSummary[]> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return data;
    },
    enabled: !isSearching,
  });

  const {
    data: searchedProducts,
    isLoading: isLoadingSearchedProducts,
    isError: isSearchedProductsError,
    error: searchedProductsError,
  } = useQuery({
    queryKey: ['searchedProducts', term],
    queryFn: async (): Promise<ProductSummary[]> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search`,
        {
          params: { term },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return data;
    },

    enabled: isSearching,
  });

  if (isLoadingSearchedProducts || isLoadingProducts) {
    return <ProductsSkeletonLoader />;
  }

  if (
    (isSearchedProductsError && !isLoadingSearchedProducts) ||
    (isProductsError && !isLoadingProducts)
  ) {
    throw new Error(
      searchedProductsError?.message ||
        productsError?.message ||
        'An unexpected error occurred'
    );
  }

  const displayProducts = isSearching ? searchedProducts : products;

  return (
    <div>
      <div>
        <h3>Products</h3>

        {isSearching && (
          <div>
            <p className='uppercase mt-4 font-light'>search result</p>
            {term === '' ? (
              <span></span>
            ) : (
              <p className='font-semibold mt-2 capitalize'>
                &apos;{term}&apos;
              </p>
            )}
          </div>
        )}

        <div className='mt-8'>
          {displayProducts && displayProducts.length > 0 ? (
            <ProductList productList={displayProducts} />
          ) : (
            <p className='font-semibold mt-2'>
              {term === ''
                ? 'No search was made.'
                : 'We couldn&apos;t find any results. Try again using another word.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className='px-4 py-6 pb-10 min-h-[90vh] xs:px-6 md:px-12 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32 xl:px-16 2xl:px-20 max-w-8xl mx-auto'>
      <MenuSidebar />

      <AllProducts />
    </div>
  );
}
