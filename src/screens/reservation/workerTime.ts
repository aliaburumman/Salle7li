import {createApi} from '@reduxjs/toolkit/query/react';

import {IGetWorkerResponse} from '../../data/home';
import customFetchBase from '../../data/middleware';

export const WorkerApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: 'workerApi',
  tagTypes: ['worker'],

  endpoints: builder => ({
    getWorkers: builder.query<IGetWorkerResponse, void>({
      query: () => `/GetWorkers`,
      providesTags: ['worker'],
    }),

    getWorkers8To10: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers8To10?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers10To12: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers10To12?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers12To14: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers12To14?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers14To16: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers14To16?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),

    getWorkers16To18: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers16To18?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),

    getWorkers18To20: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorker18To20?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers20To22: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers20To22?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers8To12: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers8To12?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers12To16: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers12To16?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers16To20: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers16To20?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers10To14: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers10To14?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers14To18: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers14To18?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
    getWorkers18To22: builder.query<
      IGetWorkerResponse,
      {date: String; gender: String; serviceName: String}
    >({
      query: body =>
        `/GetWorkers18To22?date=${body.date}&gender=${body.gender}&serviceName=${body.serviceName}`,
      providesTags: ['worker'],
    }),
  }),
});

export const {
  useGetWorkersQuery,
  useGetWorkers8To12Query,
  useGetWorkers10To12Query,
  useGetWorkers10To14Query,
  useGetWorkers12To14Query,
  useGetWorkers12To16Query,
  useGetWorkers14To16Query,
  useGetWorkers14To18Query,
  useGetWorkers16To18Query,
  useGetWorkers16To20Query,
  useGetWorkers18To20Query,
  useGetWorkers18To22Query,
  useGetWorkers20To22Query,
  useGetWorkers8To10Query,
} = WorkerApi;
