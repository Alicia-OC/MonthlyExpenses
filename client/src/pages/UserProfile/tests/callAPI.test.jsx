import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import UserProfile from '../UserProfile';
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
      name: 'Alicia',
      email: 'mail@mail',
      password: 'p12345',
    },
  });

  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>
  );

  const user = userEvent.setup();

  const updateButton = screen.getByRole('button', {
    name: /Update profile or password/i,
  });
  await user.click(updateButton);

  await user.type(screen.getByLabelText(/name/i), 'Alicia');
  await user.type(screen.getByLabelText(/mail/i), 'mail@mail');
  const passwordInput = await screen.findByLabelText(/^New password:$/i);
  const passwordInput2 = await screen.findByLabelText(
    /^Repeat new password:$/i
  );

  await user.type(passwordInput, 'p12345');
  await user.type(passwordInput2, 'p12345');

  const saveButton = await screen.findByRole('button', { name: /save/i });
  await user.click(saveButton);

  expect(axios.patch).toHaveBeenCalledWith(
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
  expect(response.data.email).toBe('mail@mail');
});

test('input values do not reach the backend', async () => {

  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>
  );

  const user = userEvent.setup();

  const updateButton = screen.getByRole('button', {
    name: /Update profile or password/i,
  });
  await user.click(updateButton);

  const passwordInput = await screen.findByLabelText(/^New password:$/i);
  const passwordInput2 = await screen.findByLabelText(
    /^Repeat new password:$/i
  );

  await user.type(passwordInput, 'p12345');
  await user.type(passwordInput2, 'p12345A');

  const saveButton = await screen.findByRole('button', { name: /save/i });
  await user.click(saveButton);

  expect(
    screen.getByText(/Please make sure both password fields are the same./i)
  ).toBeInTheDocument();

});
