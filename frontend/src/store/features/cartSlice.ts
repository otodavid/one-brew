import { CartItem } from '@/lib/types';
import { createAppSlice } from '../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  clearlocalStorage,
  loadLocalStorage,
  saveTolocalStorage,
} from '@/lib/utils';

interface Cart {
  cartItems: CartItem[];
}

const initialState: Cart = {
  cartItems: loadLocalStorage() ?? [],
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state: Cart, action: PayloadAction<CartItem | null>) => {
      if (action.payload !== null) {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state: Cart, action: PayloadAction<number>) => {
      state.cartItems.splice(action.payload, 1);

      saveTolocalStorage(state.cartItems);
    },
    // this should only be called when user signs in
    mergeCart: (state: Cart, action: PayloadAction<CartItem[] | null>) => {
      if (action.payload !== null) {
        action.payload.forEach((item) => {
          state.cartItems.push(item);
        });
      }

      clearlocalStorage();
    },
  },
});

export const { addToCart, removeFromCart, mergeCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cartItems;
