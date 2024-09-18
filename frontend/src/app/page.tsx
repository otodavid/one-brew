'use client';

import { CallOutSection } from '@/components/CallOutSection';
import { Featured } from '@/components/Featured';
import Hero from '@/components/Hero';
import Image from 'next/image';
import callOutPic from '/public/img/callout1.png';
import { CustomerReviews } from '@/components/CustomerReviews';
import { Community } from '@/components/Community';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { useEffect, useState } from 'react';
import { IDetailedProduct, IProduct } from '@/lib/types';
import data from '@/lib/data.json';
import { ProductList } from '@/components/ProductList';

export default function Home() {
  const [productList, setProductList] = useState<IProduct[]>([
    {
      id: 36,
      name: 'croissant',
      description: 'A flaky, buttery pastry perfect for pairing with coffee.',
      price: 12.99,
      image:
        'https://res.cloudinary.com/oloruntomidavid/image/upload/v1726646490/onebrew/seqgo6don3dtwsgjghkb.jpg',
      categoryName: 'bakery',
    },
    {
      id: 37,
      name: 'muffin',
      description:
        'Moist and delicious, available in various flavours like blueberry, chocolate chip, and banana nut.',
      price: 6.99,
      image:
        'https://res.cloudinary.com/oloruntomidavid/image/upload/v1726647321/onebrew/dujarkpbpvvet8wpm0ki.jpg',
      categoryName: 'bakery',
    },
    {
      id: 38,
      name: 'danish',
      description:
        'A sweet pastry with a variety of fillings such as cream cheese, fruit, or almond paste.',
      price: 10.99,
      image:
        'https://res.cloudinary.com/oloruntomidavid/image/upload/v1726646496/onebrew/fj5fwqy43ryjxiw2ckwn.jpg',
      categoryName: 'bakery',
    },
  ]);

  return (
    <div className='relative py-6'>
      <Hero />
      <Featured
        heading='Explore our Top Coffee Selection'
        subheading='Discover the blends our customers love the most.'
      >
        <ProductCard
          id={data[1].id}
          image={data[1].image}
          name={data[1].name}
          description={data[1].description}
          price={data[1].price}
          categoryName={data[1].categoryName}
        />
      </Featured>

      <CallOutSection bgImagePath='/img/callout1.jpg' imageDesc='coffee'>
        <div>
          <h2 className='text-2xl font-bold text-center'>
            Discover Our Premium Coffee Bean Selection
          </h2>
          <Button
            asChild
            variant={'secondary'}
            size={'lg'}
            className='mt-7 mx-auto'
          >
            <Link href={'/products'}>Explore our products</Link>
          </Button>
        </div>
      </CallOutSection>

      <Featured
        heading='Delicious Fresh Baked Treats'
        subheading='Perfect companions for your coffee moments, made fresh daily. Take a pick from our special baked foods.'
      >
        <div className='grid gap-8'>
          <ProductList productList={productList} />
        </div>
      </Featured>

      <CustomerReviews />
      <Community />

      <CallOutSection
        bgImagePath='/img/callout2.jpg'
        imageDesc='coffee beans in a bag'
      >
        <div className=''>
          <h2 className='text-2xl font-bold text-center'>
            Join the <span className='text-primary-dark'>OneBrew Club</span>
          </h2>
          <p className='text-center'>
            Subscribe to our newsletter for exclusive blends, discounts, and
            early access to new products.
          </p>

          <div className='pt-8'>
            <input
              type='text'
              placeholder='Email address'
              className='px-4 py-3 rounded-full w-full'
            />
            <Button size={'lg'} className='mt-5 w-full capitalize block'>
              subscribe
            </Button>
          </div>
        </div>
      </CallOutSection>
    </div>
  );
}
