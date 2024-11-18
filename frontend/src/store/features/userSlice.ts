import { UserInfo } from '@/lib/types';
import { createAppSlice } from '../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialUser: UserInfo = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState: initialUser,

  reducers: {
    addUserInfo: (state: UserInfo, action: PayloadAction<UserInfo>) => {
      return { ...state, ...action.payload };
    },
    updateUserInfo: (
      state: UserInfo,
      action: PayloadAction<{ key: keyof UserInfo; value: string }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { addUserInfo, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
