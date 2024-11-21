'use client';

import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';

export default function Page() {
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
        <div>Loading...</div>
      )}
    </div>
  );
}
