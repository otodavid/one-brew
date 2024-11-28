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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addUserInfo,
  selectUser,
  updateUserInfo,
} from '@/store/features/userSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useRef } from 'react';
import { HomepageSkeletonLoader } from '@/components/Loaders/HomepageSkeletonLoader';
import { Input } from '@/components/ui/input';

export default function Home() {
  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<ProductSummary[]> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
      );
      return data;
    },
  });

  const { user } = useUser();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);
  const hasComponentMounted = useRef<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: (newUserInfo: UserInfo) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/add`,
        newUserInfo
      );
    },
    onSuccess: (data: AxiosResponse) => {
      // Update Redux state if needed
      dispatch(addUserInfo(data.data));
    },
    onError: (error: AxiosError) => {
      console.error('Error adding user:', error);
      throw new Error(error.message || 'There was an error Signing in');
    },
  });

  // Dispatch Redux action to update user info if `user.email` exists
  useEffect(() => {
    if (typeof user?.email === 'string') {
      dispatch(updateUserInfo({ key: 'email', value: user.email }));
    }
  }, [user, dispatch]);

  // Trigger the mutation with updated `userInfo` when `userInfo.email` is updated
  useEffect(() => {
    if (hasComponentMounted.current) {
      return;
    }

    if (userInfo.email) {
      mutate(userInfo);
      hasComponentMounted.current = true;
    }
  }, [userInfo, mutate]);

  if (isError && !isLoading) {
    throw new Error(error.message || 'An unexpected error occurred');
  }

  if (isLoading) {
    return <HomepageSkeletonLoader />;
  }

  return (
    <div className='relative'>
      <Hero />
      <Featured
        heading='Explore our Top Coffee Selection'
        subheading='Discover the blends our customers love the most.'
      >
        <div className='mb-6 mt-10 grid gap-6 grid-cols-cards-list'>
          {products &&
            products
              .slice(0, 4)
              .map((product: ProductSummary) => (
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
        <div className='lg:flex lg:gap-9 lg:justify-center'>
          <h2 className='text-center max-w-xl mx-auto lg:text-left'>
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
          {products && <ProductList productList={products.slice(0, 4)} />}
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
              Join the <span className='text-accent'>OneBrew Club</span>
            </h2>
            <p className='text-center'>
              Subscribe to our newsletter for exclusive blends, discounts, and
              early access to new products.
            </p>
          </div>

          <div className='pt-8 sm:flex sm:gap-6'>
            <Input
              type='text'
              placeholder='Email address'
              className='px-4 py-2 rounded-full w-full sm:flex-[1_1_70%] placeholder:text-background'
            />
            <Button
              size={'lg'}
              variant={'secondary'}
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
