'use client';

import { Card } from '@/components/Card';
import data from '@/utils/data.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ICoffeeType {
  name: string;
  description: string;
}

interface IParams {
  params: { category: string };
}

export default function Page({ params: { category } }: IParams) {
  const [coffeeData, setCoffeeData] = useState<ICoffeeType[]>([]);

  useEffect(() => {
    data.forEach((coffeeType) => {
      if (coffeeType.type === category) {
        setCoffeeData(() => coffeeType.data);
      }
    });
  }, [coffeeData, category]);

  return (
    <section className='px-6'>
      <h1 className='capitalize font-bold text-xl'>
        {category.replaceAll('-', ' ')}
      </h1>

      <div className='grid grid-col-[repeat(auto-fill_minmax(250px_1fr))] gap-6 pt-4'>
        {coffeeData.map((coffee) => (
          <Link href={`${category}/${coffee.name}`} key={coffee?.name}>
            <Card
              imageSrc='/img/menu-espresso.png'
              name={coffee?.name}
              shortDesc={coffee?.description}
              price={12.99}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
