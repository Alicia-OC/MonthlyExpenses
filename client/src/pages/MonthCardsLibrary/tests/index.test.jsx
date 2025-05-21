import CardsLibrary from '../CardsLibrary';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios');
import authReducer from '../../../state/authSlice';

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    user: {
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

test('inputs store the changes', async () => {
  render(
    <Provider store={store}>
      <CardsLibrary />
    </Provider>
  );
});
