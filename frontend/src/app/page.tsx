'use client';

import { CallOutSection } from '@/components/CallOutSection';
import { Featured } from '@/components/Featured';
import Hero from '@/components/Hero';
import { ReviewsList } from '@/components/ReviewsList';
import { Community } from '@/components/Community';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { useEffect, useState } from 'react';
import { IProduct } from '@/lib/types';
import data from '@/lib/data.json';
import { ProductList } from '@/components/ProductList';

export default function Home() {
  const [productList, setProductList] = useState<IProduct[] | null>(null);

  useEffect(() => {
    setProductList(data);
  }, []);

  return (
    <div className='relative'>
      <Hero />
      <Featured
        heading='Explore our Top Coffee Selection'
        subheading='Discover the blends our customers love the most.'
      >
        <div className='mb-6 mt-10 grid gap-6 grid-cols-cards-list'>
          {productList !== null ? (
            productList
              .slice(4)
              .map((item) => (
                <ProductCard
                  key={item.name}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  categoryName={item.categoryName}
                  categoryId={item.categoryId}
                  addons={item.addons}
                  sizes={item.sizes}
                  coffeeBlend={item.coffeeBlend}
                />
              ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Featured>

      <CallOutSection bgImagePath='/img/callout2.jpg' imageDesc='coffee beans'>
        <div className='md:flex md:gap-9 md:justify-center'>
          <h2 className='text-center max-w-xl md:text-left'>
            Discover Our Premium Coffee Bean Selection
          </h2>
          <Button
            asChild
            variant={'secondary'}
            size={'lg'}
            className='mt-7 mx-auto lg:mx-0'
          >
            <Link href={'/products'}>Explore our products</Link>
          </Button>
        </div>
      </CallOutSection>

      <Featured
        heading='Delicious Fresh Baked Treats'
        subheading='Perfect companions for your coffee moments, made fresh daily. Take a pick from our special baked foods.'
      >
        <div className='grid gap-8 mb-6 mt-10 grid-cols-cards-list'>
          {productList !== null ? (
            <ProductList productList={productList.slice(0, 4)} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Featured>

      <ReviewsList />
      <Community />

      <CallOutSection
        bgImagePath='/img/callout1.jpg'
        imageDesc='coffee community'
      >
        <div className='max-w-lg mx-auto'>
          <div>
            <h2 className='text-center'>
              Join the <span className='text-primary-dark'>OneBrew Club</span>
            </h2>
            <p className='text-center'>
              Subscribe to our newsletter for exclusive blends, discounts, and
              early access to new products.
            </p>
          </div>

          <div className='pt-8 sm:flex sm:gap-6'>
            <input
              type='text'
              placeholder='Email address'
              className='px-4 py-2 rounded-full w-full sm:flex-[1_1_70%]'
            />
            <Button
              size={'lg'}
              className='mt-5 w-full capitalize block sm:flex-1 sm:mt-0'
            >
              subscribe
            </Button>
          </div>
        </div>
      </CallOutSection>
    </div>
  );
}
