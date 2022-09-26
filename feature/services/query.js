import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6d33-105-112-70-196.ngrok.io/api.chatty/m/',
  }),

  endpoints: builder => ({
    getUser: builder.query({
      query: id => `/user/${id}`,
    }),

    register: builder.query({
      query: regInfo => ({
        url: 'register',
        body: regInfo,
      }),
    }),
  }),
});

export const {useGetUserQuery, useRegisterQuery} = api;
