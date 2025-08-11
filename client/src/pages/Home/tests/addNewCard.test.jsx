import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import Home from '../Home';

vi.mock('axios');

const backendLink = import.meta.env.VITE_APP_GETCARD;

const mockStore = configureStore({
  reducer: {
    userId: () => '89274589345',
    token: () => 'mocked-jwt-token',
  },
  preloadedState: {
    userId: '89274589345',
    token: 'mocked-jwt-token',
  },
});

test('successfull API call', async () => {
  const mockToken = 'mocked-jwt-token';
  const userid = '89274589345';

  axios.post.mockResolvedValue({ status: 200 });
  const user = userEvent.setup();
  render(
    <Provider store={mockStore}>
      <Home />
    </Provider>
  );

  const callAPIbutton = screen.getByRole('button', { name: /Add New/i });
  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith(
    `${backendLink}/new/${userid}`,
    { year: 2025, month: 8 },
    { headers: { Authorization: `Bearer ${mockToken}` } }
  );
});
