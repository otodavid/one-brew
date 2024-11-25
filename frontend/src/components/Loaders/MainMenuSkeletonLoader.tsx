import { Skeleton } from "../ui/skeleton";

export const MainMenuSkeletonLoader = () => {
  return (
    <div>
        <Skeleton className='h-8 w-20 mb-12' />

        <Skeleton className='h-4 w-60 mb-6' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-8 content-center'>
          <div className='flex gap-4 items-center'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
          <div className='flex gap-4 items-center'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>

        <Skeleton className='h-4 w-60 mb-6 mt-16' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex gap-4 items-center'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
          <div className='flex gap-4 items-center'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      </div>
  )
}
