'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Page() {
  const userInfo = useAppSelector(selectUser);
  return (
    <div>
      {userInfo.firstName || userInfo.lastName ? (
        <>
          <h2 className='capitalize mb-2'>
            Hi, {userInfo.firstName + ' ' + userInfo.lastName}
          </h2>
          <p>Welcome back to your account</p>
        </>
      ) : (
        <div className='space-y-4'>
          <Skeleton className='h-4 w-60' />
          <Skeleton className='h-4 w-20' />
        </div>
      )}
    </div>
  );
});
