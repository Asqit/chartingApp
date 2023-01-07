import axios, { AxiosError } from 'axios';
import { IUser, IUserCredentials } from './userTypes';

const getUrl = (endpoint = '') => `/api/users/${endpoint}`;

async function registerUser(credentials: IUserCredentials) {
	try {
		const response = await axios.post(getUrl(), credentials);

		localStorage.setItem('mar/user', JSON.stringify(response.data));

		return response.data;
	} catch (error) {
		const message = error as AxiosError;

		throw new Error(message.message);
	}
}

const service = { registerUser };
export default service;
