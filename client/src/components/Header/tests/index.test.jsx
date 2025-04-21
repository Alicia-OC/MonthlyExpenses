import { logRoles, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import NavBar from '../Header';
import configureStore from 'redux-mock-store';

import axios from 'axios';

vi.mock('axios');
const mockStore = configureStore([]);

describe('Navbar component', async () => {
  test('renders navbar correctly', async () => {
    render(<NavBar />);

    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  test('dropdown menu appears when clicked', async () => {
    render(<NavBar />);

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
    render(<NavBar />);

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

test('all navbar items are functional', async () => {
  const user = userEvent.setup();
  render(<NavBar />);
});
