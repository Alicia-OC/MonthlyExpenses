import { render, screen } from '@testing-library/react';
import SignIn from '../SignIn';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../state/store';

test('Render', async () => {
  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
});
