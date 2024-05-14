import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialState, loggedOutState, Tokens} from '../../data/user/index';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => loggedOutState,
    setTokens: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    login: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
});

export const {setTokens, logout, login} = userSlice.actions;

export default userSlice.reducer;
