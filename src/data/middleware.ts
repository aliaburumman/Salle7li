import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from "@reduxjs/toolkit/query";
  import { Mutex } from "async-mutex";
import { RootState } from "../app/regist";
import { API_BASE_URL } from "../../env";
   
  const mutex = new Mutex();
   
  const baseQuery = fetchBaseQuery({
    // baseUrl: `https://app-stg.shnp.me/api`,
    baseUrl: `${API_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
   
  const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
   
    let result = (await baseQuery(args, api, {})) as any;
    const state: any = api.getState() as RootState;
   
    if (result?.error?.data?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const state: any = api.getState() as RootState;
          const refreshToken = state.user?.refreshToken;
          if (refreshToken) {
            const refreshResult = (await baseQuery(
              {
                url: "admin/signIn",
                method: "POST",
                body: {
                  refreshToken,
                },
              },
              api,
              extraOptions
            )) as any;
            
            
   
            if (refreshResult?.data) {
              result = await baseQuery(args, api, extraOptions);
            } else {
              console.log("inside else");
            }
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
   
    return result;
  };
   
  export default customFetchBase;