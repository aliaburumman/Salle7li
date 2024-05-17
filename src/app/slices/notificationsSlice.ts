// In your notificationsSlice.js or a relevant slice file
import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    isRead: false,
    visited: false
  },
  reducers: {
    implementRead: (state, action) => {
      state.isRead = action.payload;
    },
    setVisited: state => {
      state.visited = true;
    }
  },
});

export const { implementRead, setVisited } = notificationsSlice.actions;

export default notificationsSlice.reducer;
