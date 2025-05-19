import { createSlice } from '@reduxjs/toolkit';

import avatar from '../assets/Anya.png';

const initialState = {
  mode: 'pink',
  user: {
    name: '',
    email: '',
    cards: [
      { id: '', month: '' },
      { id: '', month: '' },
      { id: '', month: '' },
      { id: '', month: '' },
    ],
    dataByYear: [
      {
        year: '',
        month: '',
        savings: '',
        expenses: 'dsa',
        income: '',
      },
    ],
    avatar: avatar,
  },
  userId: 's',
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.id;
    },
    setLogout: (state) => {
      state.user = { name: '', email: '', templates: [] };
      state.token = null;
      state.userId = '';
    },
    setMonthCards: (state, action) => {
      if (state.user) {
        state.user.templates = action.payload.templates;
      } else console.log("You haven't created any template yet");
    },
  },
});

export const { setMode, setLogin, setLogout, setMonthCards } =
  authSlice.actions;

export default authSlice.reducer;
