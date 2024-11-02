import { selectCart } from '@/store/features/cartSlice';
import { useAppSelector } from '@/store/hooks';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const OrderSummary = ({ children }: Props) => {
  const cart = useAppSelector(selectCart);
  return (
    <div className='shadow-sm rounded-lg px-4 py-6 mt-8 bg-card md:mt-0 lg:px-6'>
      <p className='text-lg capitalize font-semibold mb-4 text-center'>
        order summary
      </p>
      <div className='space-y-4'>
        <div className='flex flex-wrap gap-4 text-sm'>
          <p>Subtotal:</p>
          <span className='uppercase'>
            &#36;{' '}
            {cart
              .reduce((accumulator, item) => accumulator + item.totalPrice, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className='flex flex-wrap gap-4 text-sm'>
          <p>Delivery:</p>
          <span className='capitalize italic text-sm'>to be calculated</span>
        </div>
        <div className='flex flex-wrap gap-4'>
          <p className='font-bold'>Total:</p>
          <span className='font-bold'>
            &#36;{' '}
            {cart
              .reduce((accumulator, item) => accumulator + item.totalPrice, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
};
