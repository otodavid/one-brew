import { selectCart } from '@/store/features/cartSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAppSelector } from '@/store/hooks';
import { CartItemComponent } from './CartItemComponent';
import { OrderSummary } from './OrderSummary';

export const CheckoutReview = () => {
  const cart = useAppSelector(selectCart);

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle> Review</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {cart.length > 0 &&
            cart.map((item) => (
              <CartItemComponent
                item={item}
                key={item.cartProductID}
                isEditable={false}
              />
            ))}
        </CardContent>
      </Card>

      <OrderSummary deliveryFee={2} />
    </div>
  );
};
