import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

export const EmptyCart = () => {
  return (
    <div className='min-h-[35rem] items-center py-12 text-center'>
      <div className='w-4/5 mx-auto'>
        <div className='relative min-h-72 md:min-h-96'>
          <Image
            src={'/empty-cart.svg'}
            alt='SVG icon for empty cart'
            fill={true}
            className='object-contain object-center'
            sizes='80vw'
          />
        </div>

        <h3 className='mt-4 mb-2'>Let&apos;s get you started</h3>
        <p className='text-center text-sm'>
          Looks like your cart is empty, have a look at our menu items, and
          we&apos;ll set you right up
        </p>
        <Button asChild className='mt-8 mb-4'>
          <Link href={'/menu'}>View Menu</Link>
        </Button>
      </div>
    </div>
  );
};
