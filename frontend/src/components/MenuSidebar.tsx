'use client';

import { convertToLink } from '@/lib/utils';
import { Categories } from '@/lib/types';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { MenuSidebarSkeletonLoader } from './Loaders/MenuSidebarSkeletonLoader';
import axios from 'axios';

export const MenuSidebar = () => {
  const {
    data: categories,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: (): Promise<Categories[]> => {
      return axios.get('http://localhost:5000/categories');
    },
  });

  if (isError && !isLoading) {
    throw new Error(error.message || 'An unexpected error occurred');
  }

  if (isLoading) {
    return <MenuSidebarSkeletonLoader />;
  }
  return (
    <>
      {categories && (
        <div className='hidden lg:block'>
          <div className='mb-9'>
            <h5 className='mb-2 font-medium'>Drinks</h5>

            <ul>
              {categories.map(
                (category) =>
                  category.type === 'drinks' && (
                    <li key={category.id} className='mb-4'>
                      <Link
                        href={`/menu/${convertToLink(category.name)}/${
                          category.id
                        }`}
                        className='capitalize opacity-70 text-sm hover:opacity-100'
                      >
                        {category.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className='mb-9'>
            <h5 className='mb-2 font-medium'>Food</h5>

            <ul>
              {categories.map(
                (category) =>
                  category.type === 'food' && (
                    <li key={category.id} className='mb-4'>
                      <Link
                        href={`/menu/${convertToLink(category.name)}/${
                          category.id
                        }`}
                        className='capitalize opacity-70 text-sm hover:opacity-100'
                      >
                        {category.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
