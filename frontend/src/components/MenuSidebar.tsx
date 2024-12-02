'use client';

import { convertToLink, convertToText } from '@/lib/utils';
import Link from 'next/link';
import { MenuSidebarSkeletonLoader } from './Loaders/MenuSidebarSkeletonLoader';
import { useGetCategories } from '@/hooks/useGetCategories';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export const MenuSidebar = () => {
  const { categories, isLoading } = useGetCategories();
  const [activeLink, setActiveLink] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const paths = pathname.split('/');

    if (paths[1] === 'menu' && paths[2]) {
      setActiveLink(() => convertToText(paths[2]));
    }

    if (paths[1] === 'products') {
      setActiveLink(paths[1]);
    }
  }, [pathname, activeLink]);

  if (isLoading) {
    return <MenuSidebarSkeletonLoader />;
  }
  return (
    <div className='hidden lg:block'>
      <Link
        href='/products'
        className={`mb-3 block ${
          activeLink === 'products' ? 'text-accent' : 'text-foreground'
        }`}
      >
        All Products
      </Link>

      {categories && (
        <div>
          <Accordion
            type='multiple'
            defaultValue={['drinks']}
            className='w-full'
          >
            <AccordionItem value='drinks' className='border-b-0'>
              <AccordionTrigger className='py-2'>Drinks</AccordionTrigger>
              <AccordionContent className='pb-0'>
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
                                : 'text-foreground'
                            }`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type='multiple' defaultValue={['food']} className='w-full'>
            <AccordionItem value='food' className='border-b-0'>
              <AccordionTrigger className='py-2'>Food</AccordionTrigger>
              <AccordionContent className='pb-0'>
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
                                : 'text-foreground'
                            }`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};
