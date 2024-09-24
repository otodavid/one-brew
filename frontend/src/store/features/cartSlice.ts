import { ICartItem, IProduct } from '@/lib/types';
import { createAppSlice } from '../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ICart {
  cartItems: ICartItem[];
}

const initialState: ICart = {
  cartItems: [],
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state: ICart, action: PayloadAction<ICartItem>) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cartItems;
