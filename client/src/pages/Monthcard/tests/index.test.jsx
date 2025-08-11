import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { waitForElementToBeRemoved } from '@testing-library/react';

import MonthCard from '../MonthCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';

vi.mock('axios');

const mockToken = 'mocked-jwt-token';
const mockUserId = '76das78f87asdv87h7gf9';
const mockCardId = '67a910c50f2e7168975baaf6';

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    userId: mockUserId,
    token: mockToken,
  },
});

test('get data', async () => {
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      month: 8,
      totalExpenses: 1200,
      totalIncome: 1600,
      totalSavings: 400,
      fixedItems: {
        name: 'The Non-Negotiables',
        items: [
          {
            description: 'rent+bills+food',
            price: 605,
          },
        ],
      },
      subscriptionItems: {
        name: 'On Repeat',
        items: [
          {
            description: 'HBO',
            price: 5,
          },
        ],
      },
      otherItems: {
        name: 'Little Life Things',
        items: [
          {
            description: 'stickers',
            price: 5,
          },
        ],
      },
      transportItems: {
        name: 'Out & About',
        items: [
          {
            description: 'cabify',
            price: 5,
          },
        ],
      },

      foodItems: {
        name: 'Bits & Bites',
        items: [
          {
            description: 'cinnamon oreo',
            price: 5,
          },
        ],
      },
      fixedExpenses: 9,
      subscriptionExpenses: 9,
      otherExpenses: 9,
      transportExpenses: 9,
      foodExpenses: 4.99,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/${mockCardId}`]}>
        <Routes>
          <Route path="/:cardId" element={<MonthCard />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3000/monthcards/${mockUserId}/${mockCardId}`,
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cinnamon oreo/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Non-negotiables/i)).toBeInTheDocument();
  });
});
