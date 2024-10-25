'use client';

import { convertToText } from '@/lib/helpers';
import { ICategories } from '@/lib/types';
import Link from 'next/link';

interface Props {
  categories: ICategories;
}

export const MenuSidebar = ({ categories }: Props) => {
  return (
    <div className='hidden lg:block'>
      <div className='mb-9'>
        <h5 className='mb-2 font-medium'>Drinks</h5>

        <ul>
          {categories.drinks.map((category, index) => (
            <li key={index} className='mb-4'>
              <Link
                href={`/menu/${category.name}`}
                className='capitalize opacity-70 text-sm hover:opacity-100'
              >
                {convertToText(category.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-9'>
        <h5 className='mb-2 font-medium'>Food</h5>

        <ul>
          {categories.food.map((category, index) => (
            <li key={index} className='mb-4'>
              <Link
                href={`/menu/${category.name}`}
                className='capitalize opacity-70 text-sm hover:opacity-100'
              >
                {convertToText(category.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
