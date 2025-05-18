import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
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

    userId: '76das78f87asdv87h7gf9',
    token: 'mocked-jwt-token',
  },
});

test('input values reach the backend and update it', async () => {
  const mockToken = 'mocked-jwt-token';
  const mockUserId = '76das78f87asdv87h7gf9';

  axios.patch.mockResolvedValue({
    data: {
      cards: [
        { id: '21', month: 'March' },
        { id: '324', month: 'April' },
        { id: 'fs5d', month: 'May' },
        { id: '533', month: 'June' },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CardWidget />
    </Provider>
  );

  const user = userEvent.setup();

  /** expect(axios.get).toHaveBeenCalledWith(
    `http://localhost:3030/users/${mockUserId}/update`,
    {
      userId: mockUserId,
      token: mockToken,
      name: 'Alicia',
      email: 'mail@mail',
      password: 'p12345',
    }
  );

  const response = await axios.patch.mock.results[0].value;

  expect(response.data.name).toBe('Alicia');
  expect(response.data.email).toBe('mail@mail'); */
});
