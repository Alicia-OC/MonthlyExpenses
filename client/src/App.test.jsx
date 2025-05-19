import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test, describe } from 'vitest';
import Home from './pages/Home/Home';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './state/authSlice';

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    user: {
      name: 'Alicia',
      email: 'placeholder@test',
      cards: [
        { id: '21', month: 'March' },
        { id: '324', month: 'April' },
        { id: 'fs5d', month: 'May' },
        { id: '533', month: 'June' },
      ],
    },
    dataByYear: [
      {
        year: 2025,
        month: 'April',
        savings: 100,
        expenses: 1000,
        income: 1100,
      },
    ],
    userId: '76das78f87asdv87h7gf9',
    token: 'mocked-jwt-token',
  },
});

describe('App Component', () => {
  test('renders the heading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
