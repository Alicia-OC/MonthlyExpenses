import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import CardWidget from '../cardWidget';

import authReducer from '../../../state/authSlice';

vi.mock('axios');

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

test('renders user cards from Redux store', async () => {
  render(
    <Provider store={store}>
      <CardWidget />
    </Provider>
  );

  expect(screen.getByText(/March/i)).toBeInTheDocument();
  expect(screen.getByText(/April/i)).toBeInTheDocument();
  expect(screen.getByText(/May/i)).toBeInTheDocument();
  expect(screen.getByText(/June/i)).toBeInTheDocument();
});
