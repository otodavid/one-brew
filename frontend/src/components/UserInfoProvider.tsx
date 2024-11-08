'use client';

import { addUserInfo } from '@/store/features/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NextPage } from 'next';
import { ReactNode, useEffect, useState } from 'react';

export default function UserInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { user, isLoading: isUserLoading, error } = useUser();
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    if (user?.email && !isUserLoading && !error) {
      setCurrentUser(user.email);
    }
  }, [user, isUserLoading, error]);

  const {
    data: userData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        { params: { email: currentUser } }
      );
      return data;
    },
  });

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(addUserInfo(userData));
    }
  }, [isSuccess, userData]);

  if (isUserLoading && isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
