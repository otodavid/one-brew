'use client';

import { useEffect, useState } from 'react';
import { CompletedCheckoutForm } from '@/components/CompletedCheckoutForm';
import { CheckoutForm } from '@/components/CheckoutForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Page() {
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <section className='px-4 py-6 pb-20 xs:px-6 md:px-12 xl:px-16 2xl:px-20 max-w-8xl mx-auto'>
        <h2>Checkout</h2>

        <div className='mt-8 space-y-6'>
          {!isFormFilled ? (
            <CheckoutForm
              isFormFilled={isFormFilled}
              setIsFormFilled={setIsFormFilled}
            />
          ) : (
            <>
              <CompletedCheckoutForm setIsFormFilled={setIsFormFilled} />
            </>
          )}
        </div>
      </section>
    );
});
