import { Skeleton } from '../ui/skeleton';

export const DisplayProductSkeletonLoader = () => {
  return (
    <div className='px-4 py-6 pb-12 mx-auto xs:px-6 md:px-12 md:max-w-xl lg:max-w-8xl xl:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-16 2xl:px-20'>
      <Skeleton className='w-20 h-4 lg:col-span-2 mb-8' />

      <Skeleton className='w-full relative h-80 mx-auto rounded-lg overflow-hidden md:h-max md:aspect-video md:mx-auto lg:max-w-none lg:aspect-square lg:w-full' />

      <div className='mt-10 lg:mt-0'>
        <div className='flex justify-between mb-4'>
          <Skeleton className='w-40 h-4' />
          <Skeleton className='w-20 h-4' />
        </div>
        <Skeleton className='w-80 h-4' />

        <div className='flex gap-6 mt-12'>
          <Skeleton className='w-20 h-20 rounded-full' />
          <Skeleton className='w-20 h-20 rounded-full' />
          <Skeleton className='w-20 h-20 rounded-full' />
        </div>

        <div className='space-y-4 my-12'>
          <Skeleton className='w-80 h-4' />
          <Skeleton className='w-80 h-4' />
          <Skeleton className='w-80 h-4' />
          <Skeleton className='w-80 h-4' />
          <Skeleton className='w-80 h-4' />
          <Skeleton className='w-80 h-4' />
        </div>

        <Skeleton className='w-full h-8 rounded-ful' />
      </div>
    </div>
  );
};
