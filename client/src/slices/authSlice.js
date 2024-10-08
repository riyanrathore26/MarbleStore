import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('email'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    inout: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { inout,isLoggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;
