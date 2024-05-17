import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialState, Locale, loggedOutState, theme, Tokens} from '../../data/user/index';

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
    setLanguage: (state,action:PayloadAction<Locale>) =>
    {
      state.language=action.payload;
    },
    setTheme: (state,action:PayloadAction<theme>) =>
      {
        state.theme=action.payload;
      }
  },
});

export const {setTokens, logout, login,setLanguage,setTheme} = userSlice.actions;

export default userSlice.reducer;
