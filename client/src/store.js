// store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice'; // You will create this next
import {authReducer} from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
