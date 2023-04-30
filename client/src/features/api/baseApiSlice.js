import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: '/api/v1',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.user?.accessToken;
		const googleToken = getState().auth.googleToken;

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		} else if (googleToken) {
			headers.set('authorization', `Bearer ${googleToken}`);
		}
		return headers;
	},
});

export const baseApiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['User', 'Customer', 'Document'],
	endpoints: (builder) => ({}),
});
