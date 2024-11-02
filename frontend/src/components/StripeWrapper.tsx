import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

if (process.env.NEXT_PUBLIC_STRIPE_PK === undefined) {
  throw new Error(`${process.env.NEXT_PUBLIC_STRIPE_PK} is undefined`);
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export const StripeWrapper = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>('');

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/checkout`,
        {
          amount: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ amount: 100 }),
        }
      )
      .then(({ data }: any) => setClientSecret(data.clientSecret))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
            // amount: 100,
            // currency: 'cad',
          }}
        >
          <PaymentForm />
          <button type='button'>Submit</button>
        </Elements>
      )}
    </>
  );
};
