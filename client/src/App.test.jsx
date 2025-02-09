import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test, describe } from 'vitest';

describe('App Component', () => {
  test('renders the heading', () => {
    render(<App />);
    const heading = screen.getByText(/vite \+ react/i);
    expect(heading).toBeInTheDocument();
  });
});
