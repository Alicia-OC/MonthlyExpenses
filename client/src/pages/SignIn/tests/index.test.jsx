import { render, screen } from '@testing-library/react';
import SignIn from '../SignIn';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';

test('Render', async () => {
  render(<SignIn />);
});
