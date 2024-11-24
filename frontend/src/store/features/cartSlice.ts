import { CartItem } from '@/lib/types';
import { createAppSlice } from '../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  clearlocalStorage,
  loadLocalStorage,
  saveToLocalStorage,
} from '@/lib/utils';

interface Cart {
  cartItems: CartItem[];
}

const initialState: Cart = {
  cartItems: [],
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
    removeFromCart: (state: Cart, action: PayloadAction<string>) => {
      state.cartItems.forEach((item) => {
        if (item.cartProductID === action.payload) {
          const index = state.cartItems.indexOf(item);
          state.cartItems.splice(index, 1);
        }
      });
    },
    // this should only be called when user signs in
    mergeCart: (state: Cart, action: PayloadAction<CartItem[] | null>) => {
      if (action.payload !== null) {
        state.cartItems.splice(0);
        action.payload.forEach((item) => {
          state.cartItems.push(item);
        });
      }

      clearlocalStorage();
    },

    // on initial app load from server, cart is [], update cart with local storage when app is loaded in client,
    updateCartWithLocalStorage: (
      state: Cart,
      action: PayloadAction<CartItem[]>
    ) => {
      action.payload.forEach((item) => {
        state.cartItems.push(item);
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  mergeCart,
  updateCartWithLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cartItems;
