import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';

vi.mock('axios');
const store = configureStore({
  reducer: authReducer,

});
test('renders Home', async () => {
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  const heading = screen.getByText(/July/i);
  expect(heading).toBeInTheDocument();

});
