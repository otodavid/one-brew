'use client';

import { Filter } from '@/components/Filter';
import { ProductsSkeletonLoader } from '@/components/Loaders/ProductsSkeletonLoader';
import { MenuSidebar } from '@/components/MenuSidebar';
import { ProductList } from '@/components/ProductList';
import { ProductPageWrapper } from '@/components/ProductPageWrapper';
import { Button } from '@/components/ui/button';
import { ProductSummary } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductsResponseData {
  data: ProductSummary[];
  hasMore: boolean;
}

export default function Page() {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState<string | null>(searchParams.get('term'));
  const [page, setPage] = useState<number>(1);
  const [fetchedProducts, setFetchedProducts] = useState<ProductSummary[]>([]);

  useEffect(() => {
    const params = searchParams.get('term');
    setTerm(params);
  }, [searchParams]);

  const {
    data: searchedProducts,
    isLoading: isLoadingSearchedProducts,
    isError: isSearchedProductsError,
    error: searchedProductsError,
  } = useQuery({
    queryKey: ['searchedProducts', term, page],
    queryFn: async (): Promise<ProductsResponseData> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search`,
        {
          params: { term, page, limit: 5 },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return data;
    },
  });

  useEffect(() => {
    if (searchedProducts) {
      setFetchedProducts((prev) =>
        page === 1 ? searchedProducts.data : [...prev, ...searchedProducts.data]
      );
    }
  }, [searchedProducts, page]);

  useEffect(() => {
    if (term) {
      // if term for search changes, reset page to 1
      setPage(1);
    }
  }, [term]);

  if (isLoadingSearchedProducts && page === 1) {
    return <ProductsSkeletonLoader />;
  }

  if (isSearchedProductsError && !isLoadingSearchedProducts) {
    throw new Error(
      searchedProductsError?.message || 'An unexpected error occurred'
    );
  }

  return (
    <ProductPageWrapper>
      <div>
        <div>
          <h3>Products</h3>

          <div className='block mr-0 ml-auto lg:hidden'>
            <Filter />
          </div>
        </div>

        <div>
          <p className='uppercase mt-4 font-light'>search result</p>
          {term && (
            <p className='font-semibold mt-2 capitalize'>&apos;{term}&apos;</p>
          )}
        </div>

        <div className='mt-8'>
          {fetchedProducts && fetchedProducts.length > 0 ? (
            <>
              <ProductList productList={fetchedProducts} />

              {isLoadingSearchedProducts && page > 1 && (
                <ProductsSkeletonLoader />
              )}

              {searchedProducts?.hasMore && (
                <Button
                  className='mt-8 block mx-auto px-8'
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Load more
                </Button>
              )}
            </>
          ) : (
            <>
              {term === '' || term === null ? (
                <p className='font-semibold mt-2'>
                  No search was made. Try again using another word
                </p>
              ) : (
                <p className='font-semibold mt-2'>
                  We couldn&apos;t find any results. Try again using another
                  word
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </ProductPageWrapper>
  );
}
