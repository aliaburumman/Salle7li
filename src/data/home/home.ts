import {createApi} from '@reduxjs/toolkit/query/react';
import {
  ICreateOrder,
  IGETOrderHistoryResponse,
  IGetCheckPromoCodeResponse,
  IGetEditUser,
  IGetEditUserResponse,
  IGetWorkerResponse,
} from './index';
import customFetchBase from '../middleware';

export const HomeApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: 'homeApi',
  tagTypes: ['home', 'order'],
  endpoints: builder => ({
    getWorkers: builder.query<IGetWorkerResponse, void>({
      query: () => `/GetWorkers`,
      providesTags: ['home'],
    }),

    getFiveStarsWorkers: builder.query<IGetWorkerResponse, void>({
      query: () => `/GetFiveStarsWorkers`,
      providesTags: ['home'],
    }),

    rateWorker: builder.mutation<
      IGetWorkerResponse,
      {workerId: number; rating: number}
    >({
      query: body => ({
        url: `/OrderHistoryEF/RateWorker/${body.workerId}/${body.rating}`,
        method: 'POST',
      }),

      invalidatesTags: ['home'],
    }),

    getWorker: builder.query<IGetWorkerResponse, {workerId: number}>({
      query: query => `/GetWorker/${query.workerId}`,
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
    createOrder: builder.mutation<IGetEditUserResponse, ICreateOrder>({
      query: body => ({
        url: '/OrderEF/CreateOrder',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['order'],
    }),

    checkPromoCode: builder.query<
      IGetCheckPromoCodeResponse,
      {promoCode: string}
    >({
      query: body => {
        const url = `/OrderEF/CheckPromoCode/${body.promoCode}`;
        console.log('Check Promo Code URL:', url); // Log the URL here
        return {
          url,
          method: 'GET',
        };
      },
    }),

    getOrderHistory: builder.query<IGETOrderHistoryResponse, {userId?: number}>(
      {
        query: body => ({
          url: `/OrderHistoryEF/GetOrdersHistory/${body.userId}`,
          method: 'GET',
        }),
        providesTags: ['order'],
      },
    ),
  }),
});

export const {
  useGetWorkersQuery,
  useGetWorkerQuery,
  useGetOrderHistoryQuery,
  useGetFiveStarsWorkersQuery,
  useCheckPromoCodeQuery,
  useLazyCheckPromoCodeQuery,
  useRateWorkerMutation,
  useCreateOrderMutation,
  useUpdateProfileMutation,
} = HomeApi;
