'use client';

import { Button } from '@/components/ui/button';
import { selectCart } from '@/store/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function Cart() {
  const { category, product } = useParams<{
    category: string;
    product: string;
  }>();

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCart);

  return (
    <section className='px-4 py-6'>
      <h2 className='capitalize font-bold'>Cart</h2>

      <div className='grid grid-cols-1 gap-y-8 pb-12 mt-8'>
        {cartItems.map((item) => (
          <div
            key={item.name}
            className='flex flex-wrap gap-4 shadow-sm rounded-lg px-4 py-6 bg-card'
          >
            <div className='self-start relative h-20 w-20 rounded-full overflow-hidden'>
              <Image
                src={item.imageSrc}
                fill={true}
                alt={item.name}
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <h4 className='text-xl pb-3'>{item.name}</h4>
              <p>large cup</p>
              <div>
                <div className='text-sm flex gap-2'>
                  <p className='border-b border-dotted flex-1'>
                    3 espresso shots
                  </p>
                  <span>+.50</span>
                </div>
                <div>
                  <p>1 foam milk</p>
                  <span>+1.50</span>
                </div>
                <div>
                  <p>1 chocolate syrup</p>
                  <span>+.60</span>
                </div>
                <div>
                  <p>2 oat milk</p>
                  <span>+1.00</span>
                </div>
              </div>
            </div>

            <div className='flex-[1_1_100%] flex justify-end gap-4'>
              <Button asChild variant={'ghost'} size={'icon'}>
                <Link href='/cart/update'>
                  <CiEdit size={'18'} />
                </Link>
              </Button>

              <Button variant={'ghost'} size={'icon'} onClick={() => dispatch}>
                <MdOutlineDeleteOutline size={'18'} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
