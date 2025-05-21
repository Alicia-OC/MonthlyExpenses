import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

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
      dataByYear: [
        {
          year: 2025,
          month: 'September',
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
  },
});

test('Render and get redux state content', () => {
  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>
  );

  expect(screen.getByText(/Alicia/i)).toBeInTheDocument();
  expect(screen.getByText(/placeholder@test/i)).toBeInTheDocument();
  expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
});

test('inputs store the changes', async () => {
  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>
  );

  const user = userEvent.setup();

  const updateButton = screen.getByRole('button', {
    name: /Edit profile or password/i,
  });

  await user.click(updateButton);

  await user.type(screen.getByLabelText(/name/i), 'Alicia2');
  expect(screen.getByLabelText(/name/i)).toHaveValue('Alicia2');

  await user.type(screen.getByLabelText(/mail/i), 'mail@mail');
  expect(screen.getByLabelText(/mail/i)).toHaveValue('mail@mail');

  const passwordInput = await screen.findByLabelText(/^New password:$/i);
  await user.type(passwordInput, 'p12345');
  expect(passwordInput).toHaveValue('p12345');

  const repeatPasswordInput = await screen.findByLabelText(
    /^Repeat new password:$/i
  );
  await user.type(repeatPasswordInput, 'p12345');
  expect(repeatPasswordInput).toHaveValue('p12345');



});
