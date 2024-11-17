import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { logout } from "../auth/authSlice";

// Define baseQuery with Authorization headers
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  prepareHeaders: async (headers, { getState }) => {
    // Get the current session to get the accessToken
    const session = await getSession();

    const token = session?.accessToken; // Get the latest token from session

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Add token to Authorization header
    }
    return headers;
  },
});

// Create the apiSlice with error handling for unauthorized access (401)
// export const apiSlice = createApi({
//   reducerPath: "api", // This will be used in the store
//   baseQuery: async (args, api, extraOptions) => {
//     // Execute the base query
//     const result = await baseQuery(args, api, extraOptions);

//     // If the error status is 401 (Unauthorized), handle the logout
//     if (result?.error?.status === 401) {
//       console.log("Unauthorized error: Logging out...");
//       api.dispatch(logout()); // Dispatch the logout action
//       localStorage.clear(); // Clear localStorage to remove session/token
//     }

//     return result; // Return the result to continue the normal flow
//   },
//   tagTypes: [], // Optional: You can define tags if you need to use caching
//   endpoints: (builder) => ({
//     // Define your API endpoints here
//     getSomeData: builder.query({
//       query: () => "someEndpoint", // Replace with your actual endpoint
//     }),
//     // Add more endpoints as needed
//   }),
// });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(logout());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
