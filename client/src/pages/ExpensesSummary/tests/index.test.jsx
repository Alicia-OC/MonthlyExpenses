import ExpensesSummary from '../ExpensesSummary';

import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios');
import authReducer from '../../../state/authSlice';

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    user: {
      dataByYear: [
        {
          year: 2025,
          month: 'April',
          savings: 123,
          expenses: 756,
          income: 444,
        },
        {
          year: 2025,
          month: 'May',
          savings: 123,
          expenses: 756,
          income: 444,
        },
      ],
    },

    userId: '76das78f87asdv87h7gf9',
    token: 'mocked-jwt-token',
    currency: '€',
  },
});

test('display data', async () => {
  render(
    <Provider store={store}>
      <ExpensesSummary />
    </Provider>
  );

  waitFor(() => expect(screen.getByText('€')).toBeInTheDocument());
});
