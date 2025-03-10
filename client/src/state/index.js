import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'pink',
  user: { name: '', email: '' },
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
      state.id = action.payload.id;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.id = null;
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
