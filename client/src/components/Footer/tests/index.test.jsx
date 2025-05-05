import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import Footer from '../Footer';
import axios from 'axios';

test('render footer', async () => {
  const user = userEvent.setup();
  render(<Footer />);

  const gitHubItem = screen.getByTitle(/Visit my GitHub profile/i);
  const linkedinItem = screen.getByTitle(/Visit my LinkedIn profile/i);


});
