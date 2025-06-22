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
      cardId: mockCardId,
      year: 2024,
      month: 2,
      totalExpenses: 1200,
      totalIncome: 1600,
      totalSavings: 400,
      fixedItems: [
        {
          description: 'rent+bills+food',
          price: 605,
          date: new Date('2025-02-01'),
        },
      ],
      subscriptionItems: [
        {
          description: 'HBO',
          price: 4.99,
          date: new Date('2025-02-01'),
        },
        {
          description: 'Amazon no ads',
          price: 1.99,
          date: new Date('2025-02-01'),
        },
      ],
      otherItems: [
        {
          description: 'print label + adhesive',
          price: 2.56,
          category: '67a91f012213777227c723ca',
          date: new Date('2025-02-01'),
        },
        {
          description: 'Decathlon',
          price: 76,
          category: '67a91f012213777227c723cb',
          date: new Date('2025-02-01'),
        },
      ],
      transportItems: [
        {
          description: 'cabify',
          price: 6.98,
          category: '67a91f012213777227c723cb',

          date: new Date('2025-02-01'),
        },
      ],

      foodItems: [
        {
          description: 'cinnamon oreo',
          price: 4.99,
          category: '67a91f012213777227c723cb',

          date: new Date(),
        },
      ],
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
      `http://localhost:3030/monthcards/${mockUserId}/${mockCardId}`,
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading data/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cinnamon oreo/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Non-negotiables/i)).toBeInTheDocument();
  });
});
