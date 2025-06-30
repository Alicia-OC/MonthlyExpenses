import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';

import EditingCard from "../EditingCard";
import authReducer from '../../../state/authSlice';

const store = configureStore({
    reducer: authReducer,
    preloadedState: {
        user: {},

        userId: '76das78f87asdv87h7gf9',
        token: 'mocked-jwt-token',
        currency: '€',
    },
});

test('display data', async () => {
    render(
        <Provider store={store}>
            <EditingCard />
        </Provider>
    );

    waitFor(() => expect(screen.getByText('€')).toBeInTheDocument());


});
