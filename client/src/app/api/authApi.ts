import { apiSlice } from './apiSlice';

const authApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		example: build.query({
			query: () => 'test/2',
		}),
	}),
});

export const { useExampleQuery } = authApi;
