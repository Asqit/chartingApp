import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './states/authSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
