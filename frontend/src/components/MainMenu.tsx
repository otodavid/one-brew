'use client';

import { convertToLink } from '@/lib/utils';
import { Categories } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { MainMenuSkeletonLoader } from './Loaders/MainMenuSkeletonLoader';

export const MainMenu = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Categories[]> => {
      const res = await fetch('http://localhost:5000/categories');
      return await res.json();
    },
  });

  if (isError && !isLoading) {
    return <div>An Error occured</div>;
  }

  if (isLoading) {
    return <MainMenuSkeletonLoader />;
  }

  return (
    <div>
      <h2 className='mb-2 lg:mb-8'>Menu</h2>
      {/* Drinks section */}
      <section className='py-6 lg:pt-0'>
        <h4 className='border-b pb-2'>Drinks</h4>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))] gap-8 pt-6'>
          {categories?.map(
            (category) =>
              category.type === 'drinks' && (
                <Link
                  href={`/menu/${convertToLink(category.name)}/${category.id}`}
                  className='grid grid-cols-[auto_1fr] items-center gap-4 group'
                  key={category.id}
                >
                  <div className='rounded-full overflow-hidden'>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={75}
                      height={75}
                      className='object-cover object-center aspect-square'
                    />
                  </div>
                  <p className='font-medium group-hover:text-primary capitalize'>
                    {category.name}
                  </p>
                </Link>
              )
          )}
        </div>
      </section>

      {/* food section */}
      <section className='py-6'>
        <h4 className='border-b pb-2'>Food</h4>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))] gap-8 pt-6'>
          {categories?.map(
            (category) =>
              category.type === 'food' && (
                <Link
                  href={`/menu/${convertToLink(category.name)}/${category.id}`}
                  className='grid grid-cols-[auto_1fr] items-center gap-4 group'
                  key={category.id}
                >
                  <div className='rounded-full overflow-hidden'>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={75}
                      height={75}
                      className='object-cover object-center aspect-square'
                    />
                  </div>
                  <p className='font-medium group-hover:text-primary capitalize'>
                    {category.name}
                  </p>
                </Link>
              )
          )}
        </div>
      </section>
    </div>
  );
};
