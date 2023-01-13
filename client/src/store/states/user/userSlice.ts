import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserCredentials, IUserState } from './userTypes';
import userService from './userService';

function getInitialUser(): IUser | null {
	if (localStorage.getItem('mar/user')) {
		const payload = JSON.parse(localStorage.getItem('mar/user')!);
		return payload;
	}

	return null;
}

const initialState: IUserState = {
	isError: false,
	isLoading: false,
	isSuccess: false,
	user: getInitialUser(),
	message: '',
};

//-------------------------------------------Thunks
const registerUser = createAsyncThunk(
	'user/register',
	async (credentials: IUserCredentials, thunk) => {
		try {
			return await userService.registerUser(credentials);
		} catch (error) {
			return thunk.rejectWithValue(error);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = String(action.payload);
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			});
	},
});
