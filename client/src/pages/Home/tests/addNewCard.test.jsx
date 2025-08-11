import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';
import store from '../../../state/store';

import Home from '../Home';

vi.mock('axios');

const initialState = {
  mode: 'pink',
  user: { name: '', email: '', image: '' },
  userId: '',
  token: null,
};

test('successfull API call', async () => {
  const mockToken = 'mocked-jwt-token';

  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
});
