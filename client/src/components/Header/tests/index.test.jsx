import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import NavBar from '../Header';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';

import axios from 'axios';

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
    },
    dataByYear: [
      {
        year: 2025,
        month: 'April',
        savings: 100,
        expenses: 1000,
        income: 1100,
      },
    ],
    userId: '76das78f87asdv87h7gf9',
    token: 'mocked-jwt-token',
  },
});

describe('Navbar component', async () => {
  test('renders navbar correctly when logged', async () => {
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );

    expect(screen.getByText('Peekly')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Toggle navigation/i,
      })
    ).toBeInTheDocument();
  });

  test('dropdown menu appears when clicked', async () => {
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    const user = userEvent.setup();

    const dropdownToggle = screen.getByAltText(/avatar-img/i);
    await user.click(dropdownToggle);

    const dropdownMenu = screen.queryByRole('menu', { hidden: true });
    waitFor(() => expect(dropdownMenu).not.toBeVisible());

    await user.click(dropdownToggle);

    waitFor(() => expect(screen.getByText('Settings')).toBeVisible());
  });

  test('logout button calls API', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    const mockToken = 'mocked-jwt-token';
    axios.post.mockResolvedValue({
      status: 200,
      data: { token: mockToken },
    });
    const logoutItem = screen.findAllByText(/logout/i);

    const dropdownToggle = screen.getByAltText(/avatar-img/i);
    await user.click(dropdownToggle);

    waitFor(async () => {
      await user.click(logoutItem);
    });
  });
});

test('when user isnt auth, navbar doesnt display user menu nor currency', async () => {
  const store = configureStore({
    reducer: authReducer,
    preloadedState: {
      token: null,
    },
  });

  const dropdownMenu = screen.queryByRole('menu', { hidden: true });

  expect(dropdownMenu).not.toBeInTheDocument();

  render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
});
