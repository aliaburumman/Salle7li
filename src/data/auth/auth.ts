import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import {
  ISendOTPData,
  ISendOTPResponse,
  IVerifyOTPData,
  IVerifyOTPResponse,
  ISignUpData,
  ISignUpResponse,
} from './index';

export const AuthApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: 'AuthApi',
  tagTypes: ['auth'],
  endpoints: builder => ({
    sendOtp: builder.mutation<ISignUpResponse, ISendOTPData>({
      query: (body) => ({
        url: '/Auth/Login',
        method: 'POST',
        body
      }),
    }),
    verifyOtp: builder.mutation<IVerifyOTPResponse, IVerifyOTPData>({
      query: (body) => ({
        url: '/Auth/VerifyOtp',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<ISignUpResponse, ISignUpData>({
      query: body => ({
        url: '/Auth/Register',
        method: 'POST',
        body
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useSignUpMutation,
} = AuthApi;
