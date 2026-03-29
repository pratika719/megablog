import { configureStore } from '@reduxjs/toolkit';
// FIX: authReducer was never added to the store
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export default store;