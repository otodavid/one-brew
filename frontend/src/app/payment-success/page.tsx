'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default withPageAuthRequired(function Page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  }, [router]);

  return (
    <div className='min-h-svh'>
      <Card className='bg-card flex-col gap-y-4 max-w-80 mx-auto mt-40 py-6 text-center'>
        <CardHeader>
          <CardTitle>Your payment was Successful</CardTitle>
        </CardHeader>
        <CardContent>
          <IoMdCheckmarkCircleOutline
            size='4rem'
            className='text-green-600 mx-auto'
          />
          <p className='mt-4'>We will begin preparing your order</p>
        </CardContent>
      </Card>

      <p className='font-semibold mt-4 text-center text-sm italic'>
        Please hold on...
      </p>
    </div>
  );
});
