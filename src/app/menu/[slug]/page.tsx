'use client';

import { Card } from '@/components/Card';
import data from '@/utils/data.json';
import { useEffect, useState } from 'react';

interface ICoffeeType {
  name: string;
  description: string;
}

interface IParams {
  params: { slug: string };
}

export default function Page({ params: { slug } }: IParams) {
  const [coffeeData, setCoffeeData] = useState<ICoffeeType[]>([]);

  useEffect(() => {
    data.forEach((coffeeType) => {
      if (coffeeType.type === slug) {
        setCoffeeData(() => coffeeType.data);
      }
    });
  }, [coffeeData, slug]);

  return (
    <section className='px-6'>
      <h1 className='capitalize font-bold text-xl'>
        {slug.replaceAll('-', ' ')}
      </h1>

      <div className='grid grid-col-[repeat(auto-fill_minmax(250px_1fr))] gap-6 pt-4'>
        {coffeeData.map((coffee) => (
          <Card
            key={coffee?.name}
            imageSrc='/img/menu-espresso.png'
            name={coffee?.name}
            shortDesc={coffee?.description}
            price={12.99}
          />
        ))}
      </div>
    </section>
  );
}
