import { Skeleton } from "../ui/skeleton";

export const MenuSidebarSkeletonLoader = () => {
  return (
    <div className='hidden lg:block space-y-12'>
      <div className='space-y-6'>
        <Skeleton className='h-4 w-20' />
        <div className='space-y-4'>
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-4 w-40' />
        </div>
      </div>
      <div className='space-y-6'>
        <Skeleton className='h-4 w-20' />
        <div className='space-y-4'>
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-4 w-40' />
        </div>
      </div>
    </div>
  );
};
