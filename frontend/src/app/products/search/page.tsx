'use client';

import { ProductsSkeletonLoader } from '@/components/Loaders/ProductsSkeletonLoader';
import { MenuSidebar } from '@/components/MenuSidebar';
import { ProductList } from '@/components/ProductList';
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

const AllProducts = () => {
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
          params: { term, page, limit: 1 },
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
    <div>
      <div>
        <h3>Products</h3>

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
