import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import axios from 'axios';


import UserProfile from '../UserProfile';
import authReducer from '../../../state/authSlice';

vi.mock('axios');

const store = configureStore({
  reducer: authReducer,
  preloadedState: {
    user: {
      userId: '76das78f87asdv87h7gf9',
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

describe('Inputs + backend', () => {
  test('inputs store the changes', async () => {
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

    await user.type(screen.getByLabelText(/name/i), 'Alicia2');
    expect(screen.getByLabelText(/name/i)).toHaveValue('Alicia2');

    await user.type(screen.getByLabelText(/mail/i), 'mail@mail');
    expect(screen.getByLabelText(/mail/i)).toHaveValue('mail@mail');

    const passwordInput = await screen.findByLabelText(/^New password:$/i);
    await user.type(passwordInput, 'p12345');
    expect(passwordInput).toHaveValue('p12345');

    const repeatPasswordInput = await screen.findByLabelText(
      /^Repeat new password:$/i
    );
    await user.type(repeatPasswordInput, 'p12345');
    expect(repeatPasswordInput).toHaveValue('p12345');
  });

  test('input values reach the backend and update it', async () => {
    const mockToken = 'mocked-jwt-token';
    const mockUserId = '76das78f87asdv87h7gf9';

    axios.post.mockResolvedValue({ data: { success: true } });


    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );

    const user = userEvent.setup();

    const button = waitFor(() => {
      expect(
        screen.findByRole('button', {
          name: /save/i,
        })
      ).toBeInTheDocument();
    });

    waitFor(async () => {
      await user.click(button);
    });

    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:3030/users/${mockUserId}/update`,
      {
        userId: '76das78f87asdv87h7gf9',
        token: mockToken,
        name: 'Laia',
        email: 'start@placeholder',
        newPassword: '123457u',
      }
    );


    const response = await axios.post.mock.results[0].value;

    expect(response.data.name).toBe('Laia');
    expect(response.data.email).toBe('start@placeholder');
    expect(response.data.password).toBe('123457u');



  });
});
