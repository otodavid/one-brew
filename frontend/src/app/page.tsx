'use client';

import { CallOutSection } from '@/components/CallOutSection';
import { Featured } from '@/components/Featured';
import Hero from '@/components/Hero';
import { ReviewsList } from '@/components/ReviewsList';
import { Community } from '@/components/Community';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductSummary, UserInfo } from '@/lib/types';
import { ProductList } from '@/components/ProductList';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/products');
      return await res.json();
    },
  });

  if (isError && !isLoading) {
    return <div>An Error occured</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className='relative'>
      <Hero />
      <Featured
        heading='Explore our Top Coffee Selection'
        subheading='Discover the blends our customers love the most.'
      >
        <div className='mb-6 mt-10 grid gap-6 grid-cols-cards-list'>
          {products.slice(0, 4).map((product: ProductSummary) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              categoryName={product.categoryName}
              categoryType={product.categoryType}
            />
          ))}
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
            <Link href={'/menu'}>Explore our products</Link>
          </Button>
        </div>
      </CallOutSection>

      <Featured
        heading='Delicious Fresh Baked Treats'
        subheading='Perfect companions for your coffee moments, made fresh daily. Take a pick from our special baked foods.'
      >
        <div className='grid gap-8 mb-6 mt-10 grid-cols-cards-list'>
          {<ProductList productList={products.slice(0, 4)} />}
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
