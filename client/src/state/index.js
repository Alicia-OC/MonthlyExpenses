import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';

// Preload the same initialState from the slice ONLY in dev
const preloadedState =
  import.meta.env.MODE === 'production'
    ? { auth: authSlice.getInitialState() }
    : undefined;

const store = configureStore({
  reducer: { auth: authSlice.reducer },
  preloadedState,
});

export default store;
