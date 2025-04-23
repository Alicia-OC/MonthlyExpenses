import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../state/store';

import UserProfile from '../UserProfile';
import avatar from '../../../assets/Anya.png';

const initialState = {
  user: { name: 'Alicia', email: 'placeholder@test', image: { avatar } },
};

test('Render', async () => {
  render(
    <Provider store={store}>
      <UserProfile />
    </Provider>
  );

  const userName = screen.getByText(/Alicia/i);
  const userMail = screen.getByText(/placeholder@test/i);
  const userImg = screen.getByAltText({ avatar });


});
