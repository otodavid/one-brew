import { addToCart, syncCart } from '@/store/features/cartSlice';
import { selectUser } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export const useCartSync = ({ user }: { user: UserProfile | undefined }) => {
  const userInfo = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // fetch any existing user cart from database
  const { data: userCart } = useQuery({
    queryKey: ['cart', userInfo.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/cart`,
        { params: { email: userInfo.email } }
      );
      return data;
    },
  });

  useEffect(() => {
    // update app with user cart information
    if (userCart) {
      dispatch(syncCart(userCart));
    }
  }, [userCart, dispatch]);

  return;
};
