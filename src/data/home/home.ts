import { createApi } from '@reduxjs/toolkit/query/react';
import { ICreateOrder, IGetCheckPromoCodeResponse, IGetEditUser, IGetEditUserResponse, IGetWorkerResponse, } from './index';
import customFetchBase from '../middleware';

export const HomeApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: 'homeApi',
  tagTypes: ['home','order'],
  endpoints: builder => ({
    getWorkers: builder.query<IGetWorkerResponse,void>({
      query: () => `/GetWorkers`,
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
    createOrder:builder.mutation<IGetEditUserResponse, ICreateOrder>({
      query: body => ({
        url: '/OrderEF/CreateOrder',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['order'],
    }),

    checkPromoCode:builder.mutation<IGetCheckPromoCodeResponse, {promoCode:string}>({
      query: body => ({
        url: `/OrderEF/CheckPromoCode/${body.promoCode}`,
        method: 'POST',
      }),
      invalidatesTags: ['order'],
    }),

    
  }),
});

export const {
  useGetWorkersQuery,
  useGetWorkerQuery,
  useCheckPromoCodeMutation,
  useCreateOrderMutation,
  useUpdateProfileMutation,
} = HomeApi;
