import { render, screen } from '@testing-library/react';
import SignUp from '../SignUp';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';

import axios from 'axios';

vi.mock('axios');

test('successfull API call', async () => {
  axios.post.mockResolvedValue({ status: 201 });

  render(<SignUp />);

  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
  await user.type(screen.getByLabelText(/Password/i), 'password123');

  const callAPIbutton = screen.getByRole('button', { name: /Submit/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signup', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });
});

test('failed API call err 400', async () => {
  axios.post.mockResolvedValueOnce({
    status: 400,
    data: { error: 'Bad Request' },
  });

  render(<SignUp />);

  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
  await user.type(screen.getByLabelText(/Password/i), 'password123');

  const callAPIbutton = screen.getByRole('button', { name: /Submit/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signup', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });

  expect(screen.getByText(/Missing required fields/i)).toBeInTheDocument();
});

test('failed API call err 409', async () => {
  axios.post.mockResolvedValueOnce({
    status: 409,
    data: { error: 'Bad Request' },
  });

  render(<SignUp />);

  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Name/i), 'Test User');
  await user.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
  await user.type(screen.getByLabelText(/Password/i), 'password123');

  const callAPIbutton = screen.getByRole('button', { name: /Submit/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signup', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });

  expect(screen.getByText(/User already exists/i)).toBeInTheDocument();
});