import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test, describe } from 'vitest';
import Home from './pages/Home/Home';

describe('App Component', () => {
  test('renders the heading', () => {
    render(<App />);
  });
});


test('API call', async() =>{

  render(<Home />);


})