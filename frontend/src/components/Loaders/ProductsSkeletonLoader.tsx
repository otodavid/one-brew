import { Skeleton } from '../ui/skeleton';

export const ProductsSkeletonLoader = () => {
  return (
    <div>
      <Skeleton className='h-4 w-60 mb-6' />

      <div className='grid grid-cols-cards-list gap-y-6 gap-x-4 rounded-xl'>
        <Skeleton className='h-80' />
        <Skeleton className='h-80' />
        <Skeleton className='h-80' />
        <Skeleton className='h-80' />
        <Skeleton className='h-80' />
        <Skeleton className='h-80' />
      </div>
    </div>
  );
};
