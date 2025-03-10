import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

test('renders Home', async () => {
  const user = userEvent.setup();

  render(<Home />);
  const heading = screen.getByText(/monthly expenses/i);
  expect(heading).toBeInTheDocument();

});
