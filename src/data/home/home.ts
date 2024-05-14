import { createApi } from '@reduxjs/toolkit/query/react';
import { IGetEditUser, IGetEditUserResponse, IGetWorkerResponse, } from './index';
import customFetchBase from '../middleware';

export const HomeApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: 'homeApi',
  tagTypes: ['home'],
  endpoints: builder => ({
    getWorkers: builder.query<IGetWorkerResponse,void>({
      query: () => `/GetWorkers`,
      providesTags: ['home'],
    }),

   
    updateProfile: builder.mutation<IGetEditUserResponse[], IGetEditUser>({
      query: body => ({
        url: '/UserEF/EditUser',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['home'],
    }),

    
  }),
});

export const {
  useGetWorkersQuery,
  useUpdateProfileMutation,
} = HomeApi;
