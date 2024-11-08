'use client';

import { useState } from 'react';
import { StripeWrapper } from '@/components/StripeWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompletedCheckoutForm } from '@/components/CompletedCheckoutForm';
import { FormValues } from '@/lib/types';
import { CheckoutForm } from '@/components/CheckoutForm';
import { selectCart } from '@/store/features/cartSlice';
import { useAppSelector } from '@/store/hooks';
import { OrderSummary } from '@/components/OrderSummary';

export default function Shipping() {
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  return (
    <section className='px-4 py-6 pb-20 xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      <h2>Checkout</h2>

      <div className='mt-8 space-y-6'>
        {!isFormFilled ? (
          <CheckoutForm
            isFormFilled={isFormFilled}
            setIsFormFilled={setIsFormFilled}
          />
        ) : (
          <CompletedCheckoutForm setIsFormFilled={setIsFormFilled} />
        )}

        {isFormFilled && (
          <div className='space-y-6'>
            <OrderSummary deliveryFee={2} />

            <Card>
              <CardHeader>
                <CardTitle> Payment </CardTitle>
              </CardHeader>

              <CardContent>
                <StripeWrapper />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
