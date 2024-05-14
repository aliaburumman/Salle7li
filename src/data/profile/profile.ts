import { createApi } from '@reduxjs/toolkit/query/react';
import { IGetEditUser, IGetEditUserResponse, IGetUserProfileResponse, } from './index';
import customFetchBase from '../middleware';

export const ProfileApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: 'profileApi',
  tagTypes: ['profile'],
  endpoints: builder => ({
    getUserProfile: builder.query<IGetUserProfileResponse, { userId: number | undefined }>({
      query: (query) => `/UserEF/GetSingleUser/${query?.userId}`,
      providesTags: ['profile'],
    }),

   
    updateProfile: builder.mutation<IGetEditUserResponse, IGetEditUser>({
      query: body => ({
        url: '/UserEF/EditUser',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['profile'],
    }),

    
  }),
});

export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateProfileMutation,
} = ProfileApi;
