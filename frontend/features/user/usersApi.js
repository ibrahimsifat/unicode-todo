import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
      transformResponse(apiResponse, meta) {
        return {
          data: apiResponse,
          totalCount: meta.response.headers.get("X-Total-Count"),
        };
      },
   
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
