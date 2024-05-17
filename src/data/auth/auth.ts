import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import {
  ISendOTPData,
  ISendOTPResponse,
  IVerifyOTPData,
  IVerifyOTPResponse,
  ISignUpData,
  ISignUpResponse,
  ISendOTPDataForResetPassword,
  IResetPasswordData,
  IResetPasswordBeforeLoginData,
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

    sendOtpForResetPassword: builder.mutation<ISignUpResponse, ISendOTPDataForResetPassword>({
      query: body => ({
        url: `/Auth/SendOtp?email=${body.email}`,
        method: 'POST',
        body
      }),
    }),
    resetPassword: builder.mutation<ISignUpResponse, IResetPasswordData>({
      query: body => ({
        url: '/Auth/ResetPassword',
        method: 'POST',
        body
      }),
    }),
    resetPasswordbeforeLogin: builder.mutation<ISignUpResponse, IResetPasswordBeforeLoginData>({
      query: body => ({
        url: `/Auth/ResetPasswordBeforeLogin?email=${body.Email}&newPassword=${body.Password}`,
        method: 'POST',
        body
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useSendOtpForResetPasswordMutation,
  useResetPasswordMutation,
  useResetPasswordbeforeLoginMutation,
  useSignUpMutation,
} = AuthApi;
