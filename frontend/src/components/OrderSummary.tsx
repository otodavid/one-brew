import { selectCart } from '@/store/features/cartSlice';
import { useAppSelector } from '@/store/hooks';
import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { getTotalAmount } from '@/lib/helpers';

interface Props {
  children?: ReactNode;
  deliveryFee?: number;
}

export const OrderSummary = ({ children, deliveryFee }: Props) => {
  const cart = useAppSelector(selectCart);
  return (
    <Card>
      <CardHeader>
        <CardTitle>order summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
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
          {deliveryFee ? (
            <span className='text-sm'>&#36; {deliveryFee?.toFixed(2)}</span>
          ) : (
            <span className='capitalize italic text-sm'>to be calculated</span>
          )}
        </div>
        <div className='flex flex-wrap gap-4'>
          <p className='font-bold'>Total:</p>
          <span className='font-bold'>
            &#36;
            {deliveryFee
              ? parseFloat((getTotalAmount(cart) + deliveryFee).toFixed(2))
              : getTotalAmount(cart)}
          </span>
        </div>
      </CardContent>
      {children && <CardFooter>{children}</CardFooter>}
    </Card>
  );
};
