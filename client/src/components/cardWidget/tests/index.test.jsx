import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../../../state/store';

import RecentCardWidget from '../RecentCardWidget';


vi.mock('axios');

const initialState = {
  userId: '76das78f87asdv87h7gf9',
  token: 'mocked-jwt-token',
};

test('renders user cards from Redux store', async () => {
  const mockToken = 'mocked-jwt-token';
  axios.get.mockResolvedValue({
    status: 200,
    data: [
      {
        month: 8,
      },
      {
        month: 7,
      },
      {
        month: 6,
      },
      {
        month: 3,
      },
    ],
  });

  render(
    <Provider store={store}>
      <RecentCardWidget />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/August/i)).toBeInTheDocument();
  });
});
