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
  const emailInput = screen.getByLabelText(/e-mail/i);
  const passwordlInput = screen.getByLabelText(/password/i);

  expect(nameInput).toBeInTheDocument().toHaveAttribute('type', 'text');
  expect(emailInput).toBeInTheDocument().toHaveAttribute('type', 'text');
  expect(passwordlInput)
    .toBeInTheDocument()
    .toHaveAttribute('type', 'password');

  //test write content and delete content
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(passwordlInput.value).toBe('');

  await user.type(nameInput, 'Jane Doe');
  await user.type(emailInput, 'placeholder@gmail.com');
  await user.type(passwordlInput, '12345');

  expect(nameInput.value).toBe('Jane Doe');
  expect(emailInput.value).toBe('placeholder@gmail.com');
  expect(passwordlInput.value).toBe('12345');

  await user.clear(nameInput);
  await user.clear(emailInput);
  await user.clear(passwordlInput);

  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(passwordlInput.value).toBe('');

  const callAPIbutton = screen.getByRole('button', { name: /Submit/i });

  expect(callAPIbutton).toBeInTheDocument();
});
