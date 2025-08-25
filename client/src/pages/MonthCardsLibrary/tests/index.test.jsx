import CardsLibrary from '../CardsLibrary';
import { render, screen, waitFor } from '@testing-library/react';
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
    data: {
      cards: [
        {
          id: '1',
          month: 8,
          foodExpenses: 55,
          subscriptionExpenses: 34,
          transportExpenses: 13,
          otherExpenses: 46,
          currency: 'USD',
        },
        {
          id: '2',
          month: 7,
          foodExpenses: 54,
          subscriptionExpenses: 30,
          transportExpenses: 33,
          otherExpenses: 22,
          currency: 'USD',
        },
        { id: '3', month: 6, currency: 'USD' },
        { id: '4', month: 3, currency: 'USD' },
        { id: '5', month: 5, currency: 'USD' },
      ],
      groupCards: {}, // if you don't care about summaryWidget for this test
    },
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

test('renders expenses text in card', async () => {
  axios.get.mockResolvedValueOnce({
    status: 200,
    data: {
      cards: [
        {
          id: '1',
          month: 8,
          foodExpenses: 55,
          subscriptionExpenses: 34,
          transportExpenses: 13,
          otherExpenses: 46,
          currency: 'USD',
        },
      ],
      groupCards: {},
    },
  });

  render(
    <Provider store={store}>
      <CardsLibrary />
    </Provider>
  );

  const expenseText = await screen.findByText(/you have spent/i);
  expect(expenseText).toHaveTextContent(
    'You have spent 55 USD in groceries, 34 USD in subscriptions, 13 USD in transport, 46 USD and in misc!'
  );
});

test('renders summary widget correctly', async () => {
  axios.get.mockResolvedValueOnce({
    status: 200,
    data: {
      cards: [],
      groupCards: {
        2025: [
          { id: '10', month: 1 },
          { id: '11', month: 2 },
        ],
      },
    },
  });

  render(
    <Provider store={store}>
      <CardsLibrary />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
  // Year should appear
  expect(screen.getByText('2025')).toBeInTheDocument();

  // Grouped months should appear
  expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
});
