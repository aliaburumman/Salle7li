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

    getWorkersByTime: builder.query<IGetWorkerResponse,{start:string,end:string}>({
      query: (query) => `/GetWorker/${query.start}&${query.end}`,
      providesTags: ['home'],
    }),

    getWorker: builder.query<IGetWorkerResponse,{workerId:number}>({
      query: (query) => `/GetWorker/${query.workerId}`,
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
  useGetWorkersByTimeQuery,
  useGetWorkerQuery,
  useUpdateProfileMutation,
} = HomeApi;
