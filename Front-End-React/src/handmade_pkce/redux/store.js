import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import pkceReducer from './pkceSlice';

/*
Qui è dove colleghi tutti i tuoi reducer e crei il tuo store.
*/

export const store = configureStore({
    reducer: {
        pkce: pkceReducer,
    },
    middleware: [thunk],
});
