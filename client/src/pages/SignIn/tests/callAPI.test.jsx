import { render, screen } from '@testing-library/react';
import SignIn from '../SignIn';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';

import axios from 'axios';

vi.mock('axios')


test('successfull API call', async () => {
  const mockToken = 'mocked-jwt-token';
  axios.post.mockResolvedValue({
    status: 200,
    data: { token: mockToken },
  });

  render(<SignIn />);

  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
  await user.type(screen.getByLabelText(/Password/i), 'password123');

  const callAPIbutton = screen.getByRole('button', { name: /Submit/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signin', {
    email: 'test@example.com',
    password: 'password123',
  });

  const response = await axios.post.mock.results[0].value;
  expect(response.data.token).toBe(mockToken);

  

});

test('failed API call err 400', async () => {
  axios.post.mockResolvedValueOnce({
    status: 400,
    data: { error: 'Incorrect password' },
  });

  render(<SignIn />);

  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
  await user.type(screen.getByLabelText(/Password/i), 'password123');

  const callAPIbutton = screen.getByRole('button', { name: /Submit/i });

  await user.click(callAPIbutton);

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signin', {
    email: 'test@example.com',
    password: 'password123',
  });

  expect(screen.getByText(/Missing required fields/i)).toBeInTheDocument();
});

test('failed API call err 401', async () => {
    axios.post.mockResolvedValueOnce({
      status: 401,
      data: { error: 'Bad Request' },
    });
  
    render(<SignIn />);
  
    const user = userEvent.setup();
  
    await user.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password123');
  
    const callAPIbutton = screen.getByRole('button', { name: /Submit/i });
  
    await user.click(callAPIbutton);
  
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/auth/signin', {
      email: 'test@example.com',
      password: 'password123',
    });
  
    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();

  });
  