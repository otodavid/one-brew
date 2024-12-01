'use client';

import { convertToLink, convertToText } from '@/lib/utils';
import Link from 'next/link';
import { MenuSidebarSkeletonLoader } from './Loaders/MenuSidebarSkeletonLoader';
import { useGetCategories } from '@/hooks/useGetCategories';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MenuSidebar = () => {
  const { categories, isLoading } = useGetCategories();
  const [activeLink, setActiveLink] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const paths = pathname.split('/');

    if (paths[1] === 'menu' && paths[2]) {
      setActiveLink(() => convertToText(paths[2]));
    }
  }, [pathname, activeLink]);

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
                        className={`capitalize opacity-70 text-sm hover:opacity-100 ${
                          activeLink.includes(category.name)
                            ? 'text-accent opacity-100'
                            : 'text-primary'
                        }`}
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
                        className={`capitalize opacity-70 text-sm hover:opacity-100 ${
                          activeLink.includes(category.name)
                            ? 'text-accent opacity-100'
                            : 'text-primary'
                        }`}
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
