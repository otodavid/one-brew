import { CartItemProps } from '@/lib/types';
import { createAppSlice } from '../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { loadLocalStorage, saveTolocalStorage } from '@/lib/utils';

interface Cart {
  cartItems: CartItemProps[];
}

const initialState: Cart = {
  cartItems: loadLocalStorage() ?? [],
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state: Cart, action: PayloadAction<CartItemProps | null>) => {
      if (action.payload !== null) {
        state.cartItems.push(action.payload);
      }

      saveTolocalStorage(state.cartItems);
    },
    removeFromCart: (state: Cart, action: PayloadAction<number>) => {
      state.cartItems.splice(action.payload, 1);
      // state.cartItems.filter(
      //   (item, index) => state.cartItems[index] != action.payload
      // );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cartItems;
