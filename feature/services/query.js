import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://chatty-web-server.herokuapp.com/api/user',
    prepareHeaders: async header => {
      try {
        const auth_token = await AsyncStorage.getItem('@auth_token');

        if (auth_token) {
          header.set('Authorization', `Bearer ${auth_token}`);
        }

        return header;
      } catch (err) {
        console.log('@Error Occur While Setting Header:: ', err);
      }
    },
  }),

  endpoints: builder => ({
    profile: builder.query({
      query: () => ({
        url: '/profile',
        method: 'get',
      }),
    }),

    login: builder.mutation({
      query: login => ({
        url: '/login',
        body: login,
        method: 'post',
      }),
    }),
    register: builder.mutation({
      query: regInfo => ({
        url: '/register',
        body: regInfo,
      }),
    }),

    resetPassword: builder.mutation({
      query: email => ({
        url: '/password/reset',
        body: email,
        method: 'post',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useProfileQuery,
} = api;
