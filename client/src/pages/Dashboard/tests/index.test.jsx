import { render, screen } from '@testing-library/react';
import DashLayout from '../Dashboard';
import { expect, test, describe } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';  // Import for routing setup

import userEvent from '@testing-library/user-event';


const MockComponent = () => <div>Mock Content</div>;

test('renders DashLayout, header, footer and outlet', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={['/dashboard']}>

      <Routes>
        <Route element={<DashLayout />}>
          <Route path="dashboard" element={<MockComponent />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const heading = screen.getByText(/testing navbar/i);
  expect(heading).toBeInTheDocument();

  const footer = screen.getByText(/testing Footer/i);
  expect(footer).toBeInTheDocument();

  const mockContent = screen.getByText('Mock Content');
  expect(mockContent).toBeInTheDocument();
});
