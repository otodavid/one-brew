'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  }, [router]);

  return (
    <div className='min-h-svh'>
      <Card className='flex justify-center items-center bg-card flex-col gap-y-4'>
        <CardContent>
          <p>Your payment was Successful</p>
          <FaCheckCircle />
          <p>We will begin preparing your order</p>
        </CardContent>
      </Card>
    </div>
  );
}
