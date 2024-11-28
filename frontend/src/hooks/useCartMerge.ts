import { CartItem } from '@/lib/types';
import { selectCart, mergeCart } from '@/store/features/cartSlice';
import { selectUser } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef } from 'react';

interface NewCart {
  userEmail: string;
  cart: CartItem[];
}

export const useCartMerge = () => {
  const hasComponentMounted = useRef(false);
  const userInfo = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  // take cart from local storage and merge with cart data in database
  //  return merged data
  const { mutate } = useMutation({
    mutationFn: (newCart: NewCart) => {
      // returns merged cart data
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/cart/merge`,
        newCart,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },

    onSuccess: (data) => {
      localStorage.removeItem('cart');
      dispatch(mergeCart(data.data.items));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const userEmail = userInfo.email;

    if (hasComponentMounted.current || !userEmail) {
      return;
    }

    const newCart: NewCart = { userEmail, cart };
    mutate(newCart);

    hasComponentMounted.current = true;
  }, [cart, mutate, userInfo.email]);

  return;
};
