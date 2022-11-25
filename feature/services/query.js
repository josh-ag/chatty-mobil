import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://chatty-web-server.herokuapp.com/api',
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

  //defines endpoints
  endpoints: builder => ({
    profile: builder.query({
      query: id => ({
        url: `/user/profile/${id}`,
        method: 'get',
      }),
    }),

    updateProfile: builder.mutation({
      query: (id, updatedUser) => ({
        url: `/user/${id}`,
        method: 'put',
        body: updatedUser,
      }),
    }),

    updateProfilePicture: builder.mutation({
      query: newProfilePicture => {
        const profilePicture = new FormData('uploads', newProfilePicture);
        return {
          url: `/user/uploads`,
          method: 'put',
          body: profilePicture,
        };
      },
    }),

    login: builder.mutation({
      query: login => ({
        url: '/auth/login',
        body: login,
        method: 'post',
      }),
    }),

    register: builder.mutation({
      query: regInfo => ({
        url: '/auth/register',
        body: regInfo,
        method: 'post',
      }),
    }),

    resetPassword: builder.mutation({
      query: email => ({
        url: '/auth/password/reset',
        body: email,
        method: 'post',
      }),
    }),

    newPassword: builder.mutation({
      query: newPassword => ({
        url: '/auth/password/new',
        method: 'put',
        body: newPassword,
      }),
    }),

    verify: builder.mutation({
      query: code => ({
        url: '/auth/verify',
        method: 'put',
        body: code,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useNewPasswordMutation,
  useVerifyMutation,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useProfileQuery,
} = api;
