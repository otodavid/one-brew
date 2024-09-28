'use client';

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

  console.log(cart);
  const calculateTotal = () => {
    let total = 0;

    cart.forEach((item) => {
      total += item.price;
    });
  };

  return (
    <section className='px-4 py-6'>
      <h2 className='capitalize font-bold text-center'>
        Review order{cart.length > 0 && <span>{cart.length}</span>}
      </h2>

      {cart.length !== 0 ? (
        <div className='grid grid-cols-1 gap-y-8 pb-12 mt-8'>
          {cart.map((item, index) => (
            <div
              key={index}
              className='flex flex-wrap gap-4 shadow-sm rounded-lg p-4 bg-card'
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
                <div className='flex justify-between items-center'>
                  <h4 className='text-xl capitalize font-medium'>
                    {item.name}
                  </h4>

                  <span className='text-xl font-bold'>{item.price}</span>
                </div>

                <div className='mt-3 grid gap-1 font-medium'>
                  <p className='text-xs'>{item.size.name}</p>
                  {item.addons.length > 0 &&
                    item.addons.map((addon) => (
                      <div
                        key={addon.name}
                        className='text-xs grid grid-cols-[auto_1fr_auto] gap-2'
                      >
                        <p className='flex-1'>{addon.name}</p>
                        <div className='border-b border-dotted'></div>
                        <span className='font-bold'>
                          + {(addon.price * addon.quantity).toPrecision(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className='flex-[1_1_100%] flex justify-end gap-2 border-t pt-2'>
                <Button asChild variant={'ghost'} size={'icon'}>
                  <Link href='/cart/update'>
                    <CiEdit size={'18'} />
                  </Link>
                </Button>

                <Button
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  <MdOutlineDeleteOutline
                    size={'18'}
                    className='text-primary'
                  />
                </Button>
              </div>
            </div>
          ))}

          <div className='flex flex-wrap gap-4 shadow-sm rounded-lg px-4 py-6 bg-card'>
            <h3>Total</h3>
            <span>
              {cart
                .reduce((accumulator, item) => accumulator + item.totalPrice, 0)
                .toPrecision(2)}
            </span>
          </div>
        </div>
      ) : (
        <div className='h-[35rem] items-center py-12 text-center'>
          <div className='relative h-72 w-full'>
            <Image
              src={'/empty-cart.svg'}
              alt='SVG icon for empty cart'
              fill={true}
              className='object-cover object-center'
            />
          </div>
          <h3 className='mt-4'>Let&apos;s get you started</h3>
          <p className='text-center'>
            Looks like your cart is empty, have a look at our menu items, and
            we&apos;ll set you right up
          </p>
          <Button asChild className='mt-8 mb-4'>
            <Link href={'/menu'}>View Menu</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
