import { render, screen } from '@testing-library/react';
import DashLayout from '../Dashboard';
import { expect, test } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import for routing setup

import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';

const MockComponent = () => <div>Mock Content</div>;

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

test('renders DashLayout, header, footer and outlet', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          element={
            <Provider store={store}>
              <DashLayout />
            </Provider>
          }
        >
          <Route path="dashboard" element={<MockComponent />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );


});
