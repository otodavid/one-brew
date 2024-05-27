'use client';

import { Button } from '@/components/Button';
import { CallOutSection } from '@/components/CallOutSection';
import { Featured } from '@/components/Featured';
import Hero from '@/components/Hero';
import Image from 'next/image';
import callOutPic from '/public/img/callout1.png';
import { CustomerReviews } from '@/components/CustomerReviews';
import { Community } from '@/components/Community';
import { Card } from '@/components/Card';

export default function Home() {
  return (
    <div className='relative'>
      <Hero />
      <Featured
        heading='Explore our Top Coffee Selection'
        subheading='Discover the blends our customers love the most.'
      >
        <Card
          imageSrc={'/img/hero-coffee.png'}
          name={'Coffee beans'}
          shortDesc='Whatever'
          price={500}
        />
      </Featured>

      <CallOutSection>
        <div>
          <h2 className='text-2xl font-bold text-center'>
            Discover Our Premium Coffee Bean Selection
          </h2>
          <Button
            type='link'
            style='primary'
            href={'/products'}
            text='Explore our products'
            className=' mt-5 mb-8'
          />
        </div>
        <div>
          <Image src={callOutPic} alt='knjkb' />
        </div>
      </CallOutSection>

      <Featured
        heading='Delicious Fresh Baked Treats'
        subheading='Perfect companions for your coffee moments, made fresh daily. Take a pick from our special baked foods.'
      >
        <Card
          imageSrc={'/img/hero-coffee.png'}
          name={'Coffee beans'}
          shortDesc='Whatever'
          price={500}
        />{' '}
        <Card
          imageSrc={'/img/hero-coffee.png'}
          name={'Coffee beans'}
          shortDesc='Whatever'
          price={500}
        />
      </Featured>

      <CustomerReviews />
      <Community />

      <CallOutSection>
        <div className=''>
          <h2 className='text-2xl font-bold text-center'>
            Join the <span className='text-accent'>OneBrew Club</span>
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
            <Button
              type='link'
              style='primary'
              text='subscribe'
              className=' mt-5'
            />
          </div>
        </div>
      </CallOutSection>
    </div>
  );
}
