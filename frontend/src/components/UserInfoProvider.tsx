'use client';

import { useCartMerge } from '@/hooks/useCartMerge';
import { selectCart } from '@/store/features/cartSlice';
import { addUserInfo } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';

export default function UserInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { user, isLoading: isUserLoading, error } = useUser();
  const [currentUser, setCurrentUser] = useState<string>('');
  const cart = useAppSelector(selectCart);

  useCartMerge();

  useEffect(() => {
    if (user?.email && !isUserLoading && !error) {
      setCurrentUser(user.email);
    }
  }, [user, isUserLoading, error]);

  // fetch all user info from database
  const {
    data: userData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['userInfo', currentUser],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        { params: { email: currentUser } }
      );
      return data;
    },
    enabled: !!currentUser,
  });

  useEffect(() => {
    // update app with user data
    if (isSuccess && userData) {
      dispatch(addUserInfo(userData));
    }
  }, [isSuccess, userData, dispatch]);

  if (isUserLoading && isLoading) {
    return <>Loading...</>;
  }

  return <div>{children}</div>;
}
