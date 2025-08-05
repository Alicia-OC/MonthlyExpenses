import { createSlice } from '@reduxjs/toolkit';
import avatar from '../assets/Anya.png';

const initialState = {
  mode: 'pink',
  user: {
    name: '',
    email: '',
    cards: [],
    dataByYear: [],
    avatar: '',
  },
  userId: '',
  token: null,
  currency: '€',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      const { user, token } = action.payload || {};

      if (!user || !token) {
        console.error('Invalid login payload:', action.payload);
        return; // Don't update state
      }
      state.user = user
      state.token = token;
      state.userId = user._id;

      console.log(user)
    },
    setLogout: (state) => {
      state.user = {
        name: '',
        email: '',
        cards: [],
        dataByYear: [],
        avatar: '',
      };
      state.token = null;
      state.userId = '';
    },
    setCards: (state, action) => {
      if (state.user) {
        state.user.cards = action.payload.cards;
      } else console.log("You haven't created any card yet");
    },
    setCurrency: (state, action) => {
      state.currency = action.payload.currency;
    },
  },
});

export const { setMode, setLogin, setLogout, setCards, setCurrency } =
  authSlice.actions;

export default authSlice.reducer;
