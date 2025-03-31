import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../state/store';
import NavBar from '../../../components/Header/Header';

test('render header', async () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
});
