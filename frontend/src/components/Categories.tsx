'use client';

import { convertToLink, convertToText } from '@/lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CData {
  id: number;
  name: string;
  image: string;
  type: string;
}

export const Categories = () => {
  const [categories, setCategories] = useState<CData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/categories', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data: CData[] = await res.json();

        setCategories(data);
      } catch (err) {
        console.log('Could not fetch data');
      }
    };

    fetchCategories();
    console.log(categories);
  }, []);

  return (
    <>
      {/* Drinks section */}
      <section className='py-6'>
        <h3 className='text-xl font-semibold border-b pb-2'>Drinks</h3>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          {categories
            .filter((category) => category.type === 'drinks')
            .map((category) => (
              <Link
                href={`/menu/${category.name}`}
                className='grid grid-cols-[auto_1fr] items-center gap-4 group'
                key={category.id}
              >
                <div className='rounded-full overflow-hidden'>
                  <Image
                    src={category.image}
                    alt='Machiato coffee'
                    width={75}
                    height={75}
                    className='object-cover object-center aspect-square'
                  />
                </div>
                <p className='font-medium group-hover:text-primary capitalize'>
                  {convertToText(category.name)}
                </p>
              </Link>
            ))}
        </div>
      </section>

      {/* food section */}
      <section className='py-6'>
        <h2 className='text-xl font-semibold border-b pb-2'>Food</h2>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          {categories
            .filter((category) => category.type === 'food')
            .map((category) => (
              <Link
                href={`/menu/${convertToLink(category.name)}`}
                className='grid grid-cols-[auto_1fr] items-center gap-4 group'
                key={category.id}
              >
                <div className='rounded-full overflow-hidden'>
                  <Image
                    src={category.image}
                    alt='Machiato coffee'
                    width={75}
                    height={75}
                    className='object-cover object-center aspect-square'
                  />
                </div>
                <p className='font-medium group-hover:text-primary capitalize'>
                  {category.name}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};
