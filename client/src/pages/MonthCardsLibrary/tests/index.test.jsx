import CardsLibrary from '../CardsLibrary';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import authReducer from '../../../state/authSlice';
import axios from 'axios';

vi.mock('axios');

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    userId: '76das78f87asdv87h7gf9',
    token: 'mocked-jwt-token',
  },
});

test('render cards and check buttons functionality', async () => {
  const mockToken = 'mocked-jwt-token';

  axios.get.mockResolvedValue({
    status: 200,
    data: [
      {
        month: 8,
        foodExpenses: 55,
        subscriptionExpenses: 34,
        transportExpenses: 13,
        otherExpenses: 46,
      },
      {
        month: 7,
        foodExpenses: 54,
        subscriptionExpenses: 30,
        transportExpenses: 33,
        otherExpenses: 22,
      },
      {
        month: 6,
      },
      {
        month: 3,
      },
      {
        month: 5,
      },
    ],
  });

  render(
    <Provider store={store}>
      <CardsLibrary />
    </Provider>
  );

  const user = userEvent.setup();

  const nextButton = screen.getByRole('button', { name: /Next/i });
  const previousButton = screen.getByRole('button', { name: /Previous/i });

  const cardPageOne = await screen.findByTestId('8');
  expect(cardPageOne).toBeInTheDocument();

  // Click next and check new state
  await user.click(nextButton);

  const cardPageTwo = await screen.findByTestId('5');
  expect(cardPageTwo).toBeInTheDocument();
  expect(screen.queryByTestId('8')).not.toBeInTheDocument();

  // Click previous and check return to original state
  await user.click(previousButton);

  // Re-query for the elements after going back
  expect(await screen.findByTestId('8')).toBeInTheDocument();
  expect(screen.queryByTestId('5')).not.toBeInTheDocument();
});
