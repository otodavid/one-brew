import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { getTotalAmount } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/features/cartSlice';
import { selectUser } from '@/store/features/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { OrderDataOptions, StrictOmit } from '@/lib/types';

if (process.env.NEXT_PUBLIC_STRIPE_PK === undefined) {
  throw new Error(`${process.env.NEXT_PUBLIC_STRIPE_PK} is undefined`);
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export const StripeWrapper = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>('');
  const cart = useAppSelector(selectCart);
  const deliveryFee = 2;
  const userInfo = useAppSelector(selectUser);
  const hasComponentMountend = useRef(false);
  const orderAmount = useMemo(
    () => Number((getTotalAmount(cart) + deliveryFee).toFixed(2)),
    [cart]
  );
  const orderId = useMemo(() => uuidv4(), []);

  const { mutate } = useMutation({
    mutationFn: async (
      order: StrictOmit<OrderDataOptions, 'order' | 'userEmail'>
    ) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/process-payment`,
        order,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return data;
    },

    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },

    onError: (error) => {
      console.error(error);
      toast.error('An Error occured. Please try again!');
    },
  });

  useEffect(() => {
    if (hasComponentMountend.current) {
      mutate({ orderAmount, orderId });
    }

    hasComponentMountend.current = true;
  }, [mutate, orderAmount, orderId]);
  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
          }}
        >
          <PaymentForm
            orderId={orderId}
            orderAmount={orderAmount}
            order={cart}
            userEmail={userInfo.email}
          />
        </Elements>
      )}
    </>
  );
};
