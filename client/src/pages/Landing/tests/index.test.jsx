import { render } from '@testing-library/react';
import Landing from '../Landing';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    token: null,
  },
});
test('render Landing page for non auth users', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        {' '}
        <Landing />
      </MemoryRouter>
    </Provider>
  );
});
