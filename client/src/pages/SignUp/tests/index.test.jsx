import { render, screen } from '@testing-library/react';
import SignUp from '../SignUp';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../state/store';

test('Render', async () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const user = userEvent.setup();

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const passwordInput = await screen.findByLabelText(/^Password$/i);

  expect(nameInput).toBeInTheDocument().toHaveAttribute('type', 'text');
  expect(emailInput).toBeInTheDocument().toHaveAttribute('type', 'email');
  expect(passwordInput)
    .toBeInTheDocument()
    .toHaveAttribute('type', 'password');

  //test write content and delete content
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');

  await user.type(nameInput, 'Jane Doe');
  await user.type(emailInput, 'placeholder@gmail.com');
  await user.type(passwordInput, '12345');

  expect(nameInput.value).toBe('Jane Doe');
  expect(emailInput.value).toBe('placeholder@gmail.com');
  expect(passwordInput.value).toBe('12345');

  await user.clear(nameInput);
  await user.clear(emailInput);
  await user.clear(passwordInput);

  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');

  const callAPIbutton = screen.getByRole('button', { name: /Register/i });

  expect(callAPIbutton).toBeInTheDocument();
});
