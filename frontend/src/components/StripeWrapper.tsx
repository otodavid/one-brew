import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getTotalAmount } from '@/lib/helpers';
import { useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/features/cartSlice';

if (process.env.NEXT_PUBLIC_STRIPE_PK === undefined) {
  throw new Error(`${process.env.NEXT_PUBLIC_STRIPE_PK} is undefined`);
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export const StripeWrapper = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>('');
  const cart = useAppSelector(selectCart);
  const deliveryFee = 2;
  const totalAmount = getTotalAmount(cart) + deliveryFee;

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/process-payment`,
        {
          amount: totalAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(({ data }: any) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error(error);
        alert('An error occured. Please refresh the page and try again');
      });
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
          }}
        >
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};
