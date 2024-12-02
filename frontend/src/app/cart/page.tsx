'use client';

import { CartItemComponent } from '@/components/CartItemComponent';
import { EmptyCart } from '@/components/EmptyCart';
import { OrderSummary } from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { saveToLocalStorage } from '@/lib/utils';
import { selectCart } from '@/store/features/cartSlice';
import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Cart() {
  const cart = useAppSelector(selectCart);
  const userInfo = useAppSelector(selectUser);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!userInfo.email && cart) {
      saveToLocalStorage(cart);
    }
  }, [cart, userInfo]);

  if (!isMounted) {
    return null;
  }

  return (
    <section className='px-4 py-10 max-w-6xl mx-auto xs:px-6 md:px-12 md:grid md:grid-cols-[1fr_.6fr] md:gap-x-4 md:items-start lg:gap-x-12 xl:px-16 2xl:px-20'>
      {isMounted && (
        <>
          {cart.length > 0 ? (
            <>
              <div className='shadow-sm rounded-lg px-8 pt-5 pb-2 bg-card'>
                <h3 className='capitalize font-bold text-center'>
                  Review order ({cart.length})
                </h3>

                <div className='mt-6 md:px-4'>
                  {cart.map((item) => (
                    <CartItemComponent item={item} key={item.cartProductID} />
                  ))}
                </div>
              </div>
              <div className='mt-6 md:mt-0'>
                <OrderSummary>
                  <Button asChild className='w-full block text-center mt-6'>
                    <Link href={'/checkout'}>Continue to Checkout</Link>
                  </Button>
                </OrderSummary>
                <p className='text-xs text-slate-500 mt-6'>
                  Prices and shipping costs are not confirmed until you&apos;ve
                  reached checkout.
                </p>
              </div>
            </>
          ) : (
            <div className='md:col-span-2'>
              <EmptyCart />
            </div>
          )}
        </>
      )}
    </section>
  );
}
