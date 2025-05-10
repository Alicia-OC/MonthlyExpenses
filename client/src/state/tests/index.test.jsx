import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import store from '../store';
import authReducer, { setLogout, setLogin } from '../authSlice';
import NavBar from '../../components/Header/Header';

const initialState = {
  mode: 'pink',
  user: { name: '', email: '' },
  userId: '',
  token: null,
};


test('update redux state on login', async () => {

  const newState = authReducer(
    initialState,
    setLogin({
      user: { name: 'Alicia', email: 'alicia@example.com' },
      token: 'mock-token',
      id: '123',
    })
  );

  expect(newState.user.name).toBe('Alicia');
  expect(newState.token).toBe('mock-token');
  expect(newState.userId).toBe('123');
});


test('reset redux state on logout', async () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );

  const loggedInState = {
    ...initialState,
    user: { name: 'Alicia', email: 'alicia@example.com' },
    token: 'mock-token',
    userId: '123',
  };

  const newState = authReducer(loggedInState, setLogout());

  expect(newState.user).toEqual({ name: '', email: '', templates: [] });
  expect(newState.token).toBeNull();
  expect(newState.userId).toEqual('')
});
