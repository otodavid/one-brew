import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { OrderDataOptions, StrictOmit } from '@/lib/types';
import { userInfo } from 'os';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/features/userSlice';

export const PaymentForm = (orderOptions: OrderDataOptions) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // save order to database on 'pending' status
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/orders/add`,
        orderOptions
      )
      .then((data) => {
        console.log(data.status);
        console.log('added successfully');
      })
      .catch((error) => {
        console.log(error);
      });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!stripe || !elements) {
    return (
      <div className='flex items-center justify-center'>
        <div
          className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
          role='status'
        >
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='bg-white p-2 rounded-md'>
        {errorMessage && <div>{errorMessage}</div>}

        <PaymentElement />
        <Button
          disabled={!stripe || loading}
          className='w-full mt-4 disabled:opacity-50 disabled:animate-pulse'
        >
          {!loading ? `Complete Purchase` : 'Processing...'}
        </Button>
      </form>
    </>
  );
};
