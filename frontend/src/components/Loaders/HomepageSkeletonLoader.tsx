import { Skeleton } from '../ui/skeleton';

export const HomepageSkeletonLoader = () => {
  return (
    <div>
      <div className='space-y-6 mx-auto py-20 px-4 xs:px-8 sm:px-6 sm:mx-0 md:px-12 lg:max-w-2xl lg:px-16 xl:px-32 xl:py-28'>
        <Skeleton className='h-8 w-3/5 mx-auto sm:mx-0 lg:w-full' />
        <Skeleton className='h-4 w-3/4 mx-auto sm:mx-0' />
        <Skeleton className='h-5 w-20 mx-auto sm:mx-0 rounded-full' />
      </div>

      <div>
        <Skeleton className='h-6 w-60 mx-auto mb-4' />
        <Skeleton className='h-4 w-80 mx-auto' />

        <div className='px-4 py-16 max-w-8xl mx-auto xs:px-6 md:px-12 xl:px-16 2xl:py-24 2xl:px-20 grid grid-cols-cards-list gap-6'>
          <Skeleton className='h-80' />
          <Skeleton className='h-80' />
          <Skeleton className='h-80' />
          <Skeleton className='h-80' />
        </div>
      </div>
    </div>
  );
};
