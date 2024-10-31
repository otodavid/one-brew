'use client';

import { EmptyCart } from '@/components/EmptyCart';
import { Button } from '@/components/ui/button';
import { selectCart, removeFromCart } from '@/store/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className='px-4 py-10 max-w-6xl mx-auto xs:px-6 md:px-12 md:grid md:grid-cols-[1fr_.6fr] md:gap-x-4 md:items-start lg:gap-x-12 xl:px-16 2xl:px-20'>
      <div className='shadow-sm rounded-lg px-8 pt-5 pb-2 bg-card'>
        {cart.length > 0 && (
          <h3 className='capitalize font-bold text-center'>
            Review order ({cart.length})
          </h3>
        )}

        <div className='mt-6 md:px-4'>
          {cart.map((item, index) => (
            <div
              key={index}
              className='flex flex-wrap gap-4 py-4 border-t last-of-type:border-b-0'
            >
              <div className='self-start relative h-20 w-20 rounded-full overflow-hidden'>
                <Image
                  src={item.image}
                  fill={true}
                  alt={item.name}
                  className='object-cover'
                />
              </div>
              <div className='flex-1 items-center'>
                <div className='flex justify-between items-center mb-1'>
                  <Link
                    href={`/products/${item.id}`}
                    className='capitalize font-medium'
                  >
                    {item.name}
                  </Link>

                  <span className='font-semibold'>&#36; {item.price}</span>
                </div>

                <div className='grid gap-1.5 font-medium'>
                  <p className='text-xs capitalize font-light'>
                    {item.categoryName}
                  </p>
                  {item.addons.length > 0 && (
                    <>
                      <p className='text-xs capitalize mb-2'>
                        {item.size.name}
                      </p>
                      {item.addons.map((addon) => (
                        <div
                          key={addon.name}
                          className='text-xs grid grid-cols-[auto_1fr_auto] gap-2'
                        >
                          <p className='flex-1 capitalize font-normal'>
                            {addon.name}
                          </p>
                          <div className='border-b border-dotted'></div>
                          <span className='font-semibold'>
                            + &#36; {(addon.price * addon.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  <div className='text-xs flex justify-between mt-3'>
                    <p>Quantity</p>
                    <p className='font-semibold'>x{item.quantity}</p>
                  </div>
                </div>
              </div>

              <div className='flex-[1_1_100%] flex justify-end gap-2 pt-2'>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => dispatch(removeFromCart(index))}
                >
                  <MdOutlineDeleteOutline
                    size={'18'}
                    className='text-primary'
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className='shadow-sm rounded-lg px-4 py-6 mt-4 bg-card md:mt-0 lg:px-6'>
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-4 text-sm'>
              <p>Subtotal:</p>
              <span className='uppercase'>
                &#36;{' '}
                {cart
                  .reduce(
                    (accumulator, item) => accumulator + item.totalPrice,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className='flex flex-wrap gap-4 text-sm'>
              <p>Delivery:</p>
              <span className='capitalize italic text-sm'>
                to be calculated
              </span>
            </div>
            <div className='flex flex-wrap gap-4'>
              <p className='font-bold'>Total:</p>
              <span className='font-bold'>
                &#36;{' '}
                {cart
                  .reduce(
                    (accumulator, item) => accumulator + item.totalPrice,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>

          <Button asChild className='w-full block text-center mt-10'>
            <Link href={'/shipping'}>Continue to Shipping</Link>
          </Button>
        </div>
        <p className='text-xs text-slate-500 mt-6'>
          Prices and shipping costs are not confirmed until you&apos;ve reached
          checkout.
        </p>
      </div>
    </section>
  );
}
