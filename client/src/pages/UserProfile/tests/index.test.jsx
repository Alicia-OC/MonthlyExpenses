import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import store from '../../../state/store';

import UserProfile from '../UserProfile';
import avatar from '../../../assets/Anya.png';
import authReducer from '../../../state/authSlice';

const initialState = {
  user: {
    name: 'Alicia',
    email: 'placeholder@test',
    templates: [],
  },
  token: null,
};

test('Render', () => {
  const store = configureStore({
    reducer: authReducer,
    preloadedState: initialState,
  });

  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>
  );

  expect(screen.getByText(/Alicia/i)).toBeInTheDocument();
  expect(screen.getByText(/placeholder@test/i)).toBeInTheDocument();
  expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
});
