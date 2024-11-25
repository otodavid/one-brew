import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const OrdersSkeletonLoader = () => {
  return (
    <div>
      <Skeleton className='h-5 w-20 ' />
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6 py-6 mt-3'>
        <Skeleton className='h-72' />
        <Skeleton className='h-72' />
        <Skeleton className='h-72' />
        <Skeleton className='h-72' />
      </div>
    </div>
  );
};
