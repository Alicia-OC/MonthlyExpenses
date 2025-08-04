import { createSlice } from '@reduxjs/toolkit';
import avatar from '../assets/Anya.png';

const initialState =
  import.meta.env.MODE === 'development'
    ? {
        mode: 'pink',
        user: {
          name: 'Alicia (DEV)',
          email: 'placeholder@dev.local',
          cards: [
            { id: 'dev1', month: 'June' },
            { id: 'dev2', month: 'May' },
            { id: 'dev3', month: 'April' },
            { id: 'dev4', month: 'March' },
          ],
          dataByYear: [
            {
              year: '2025',
              month: 'July',
              savings: '1000',
              expenses: '500',
              income: '2000',
            },
          ],
          avatar: avatar,
        },
        userId: 'dev-76das78f87asdv87h7gf9',
        token: 'mocked-dev-token',
        currency: '€',
      }
    : {
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
      const { user, token, id } = action.payload || {};

      if (!user || !token || !id) {
        console.error('Invalid login payload:', action.payload);
        return; // Don't update state
      }
      state.user = {
        name: user.name || '',
        email: user.email || '',
        cards: user.cards || [],
        dataByYear: user.dataByYear || [],
        avatar: user.avatar || '',
      };
      state.token = token;
      state.userId = id;
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
