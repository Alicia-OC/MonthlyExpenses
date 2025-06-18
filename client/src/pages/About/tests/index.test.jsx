import { render} from '@testing-library/react';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../state/authSlice';

import About from '../About';

test('render About page', async () => {
    const store = configureStore({
        reducer: authReducer,

    });

    render(
        <Provider store={store}>
            <About />
        </Provider>
    );

    
})
