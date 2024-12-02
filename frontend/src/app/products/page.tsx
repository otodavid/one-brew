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
import { useEffect, useState } from 'react';

interface ProductsResponseData {
  data: ProductSummary[];
  hasMore: boolean;
}

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [fetchedProducts, setFetchedProducts] = useState<ProductSummary[]>([]);

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ['products', page],
    queryFn: async (): Promise<ProductsResponseData> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { page, limit: 5 },
        }
      );

      return data;
    },
  });

  useEffect(() => {
    if (products) {
      setFetchedProducts((prev) =>
        page === 1 ? products.data : [...prev, ...products.data]
      );
    }
  }, [products, page]);

  if (isLoadingProducts && page === 1) {
    return <ProductsSkeletonLoader />;
  }

  if (isProductsError && !isLoadingProducts) {
    throw new Error(productsError?.message || 'An unexpected error occurred');
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

        <div className='mt-8'>
          {fetchedProducts && fetchedProducts.length > 0 ? (
            <>
              <ProductList productList={fetchedProducts} />

              {isLoadingProducts && page > 1 && <ProductsSkeletonLoader />}

              {products?.hasMore && (
                <Button
                  className='mt-8 block mx-auto px-8'
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Load more
                </Button>
              )}
            </>
          ) : (
            <p className='font-semibold mt-2'>
              No products were found. Try again Later
            </p>
          )}
        </div>
      </div>
    </ProductPageWrapper>
  );
}
