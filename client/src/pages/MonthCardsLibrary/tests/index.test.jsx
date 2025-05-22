import CardsLibrary from '../CardsLibrary';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

vi.mock('axios');
import authReducer from '../../../state/authSlice';

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    user: {
      cards: [
        { id: '1', month: 'March' },
        { id: '2', month: 'April' },
        { id: '3', month: 'May' },
        { id: '4', month: 'June' },
        { id: '5', month: 'June' },
        { id: '6', month: 'June' },
        { id: '7', month: 'June' },
        { id: '8', month: 'June' },
        { id: '9', month: 'June' },
      ],
    },

    userId: '76das78f87asdv87h7gf9',
    token: 'mocked-jwt-token',
  },
});

test('render cards and check buttons functionality', async () => {
  render(
    <Provider store={store}>
      <CardsLibrary />
    </Provider>
  );

  const user = userEvent.setup();

  const nextButton = screen.getByRole('button', { name: /Next/i });
  const previousButton = screen.getByRole('button', { name: /Previous/i });

  await user.click(nextButton);

  const cardFive = await screen.findByTestId('5');
  expect(cardFive).toBeInTheDocument();

  await user.click(nextButton);

  const cardNine = await screen.findByTestId('9');
  expect(cardNine).toBeInTheDocument();
  expect(cardFive).not.toBeInTheDocument();

  await user.click(previousButton);

  const cardFiveAgain = await screen.findByTestId('5');
  expect(cardFiveAgain).toBeInTheDocument();
});
