import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import UserProfile from '../UserProfile';
import authReducer from '../../../state/authSlice';

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
    token: null,
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

  expect(screen.getByText(/April/i)).toBeInTheDocument();
  expect(screen.getByText(/June/i)).toBeInTheDocument();
});

test('change password', async () => {
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

  const saveButton = screen.findByRole('button', {
    name: /save/i,
  });

  const newPasswordInput = screen.findByText('/password/i');
  const repeatNewPasswordInput = screen.findByText('/password/i');


});
