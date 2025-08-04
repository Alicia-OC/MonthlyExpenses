import { render, screen } from '@testing-library/react';
import SignUp from '../SignUp';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../../../state/store';
vi.mock('axios');

test('successfull API call', async () => {
  axios.post.mockResolvedValue({ status: 201 });

  render(
    <MemoryRouter initialEntries={['/signup']}>
      <Provider store={store}>
        <SignUp />
      </Provider>{' '}
    </MemoryRouter>
  );
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/Your Email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/^Password$/i), 'password123');
  await user.type(
    screen.getByLabelText(/^Repeat your password$/i),
    'password123'
  );

  const callAPIbutton = screen.getByRole('button', { name: /Register/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signup', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });
});

test('failed API call err missing fields', async () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      {' '}
      <Provider store={store}>
        <SignUp />
      </Provider>
    </MemoryRouter>
  );

  const user = userEvent.setup();
  const callAPIbutton = screen.getByRole('button', { name: /Register/i });

  // === CASE 1: Missing Name ===
  await user.type(screen.getByLabelText(/Your Email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/^Password$/i), 'password123');
  await user.type(
    screen.getByLabelText(/^Repeat your password$/i),
    'password123'
  );
  await user.click(callAPIbutton);

  // Expect error message about missing fields
  expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

  // Clear all inputs before next case
  await user.clear(screen.getByLabelText(/Your Email/i));
  await user.clear(screen.getByLabelText(/^Password$/i));
  await user.clear(screen.getByLabelText(/^Repeat your password$/i));

  // === CASE 2: Missing Email ===
  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/^Password$/i), 'password123');
  await user.type(
    screen.getByLabelText(/^Repeat your password$/i),
    'password123'
  );
  await user.click(callAPIbutton);

  expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

  await user.clear(screen.getByLabelText(/Name/i));
  await user.clear(screen.getByLabelText(/^Password$/i));
  await user.clear(screen.getByLabelText(/^Repeat your password$/i));

  // === CASE 3: Missing Password ===
  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/Your Email/i), 'test@example.com');
  await user.type(
    screen.getByLabelText(/^Repeat your password$/i),
    'password123'
  );
  await user.click(callAPIbutton);

  expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

  await user.clear(screen.getByLabelText(/Name/i));
  await user.clear(screen.getByLabelText(/Your Email/i));
  await user.clear(screen.getByLabelText(/^Repeat your password$/i));

  // === CASE 4: Missing Repeat Password ===
  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/Your Email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/^Password$/i), 'password123');
  await user.click(callAPIbutton);

  expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
});

test('failed API call err 409', async () => {
  axios.post.mockResolvedValueOnce({
    status: 409,
    data: { error: 'Bad Request' },
  });

  render(
    <MemoryRouter initialEntries={['/signup']}>
      <Provider store={store}>
        <SignUp />
      </Provider>{' '}
    </MemoryRouter>
  );
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/Your Email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/^Password$/i), 'password123');
  await user.type(
    screen.getByLabelText(/^Repeat your password$/i),
    'password123'
  );

  const callAPIbutton = screen.getByRole('button', { name: /Register/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signup', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });

  expect(screen.getByText(/Email in use/i)).toBeInTheDocument();
});
