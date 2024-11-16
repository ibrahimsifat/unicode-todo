import { apiSlice } from "../api/apiSlice";
import socket from "../socket";

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
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          // Task event listeners
          const handleTaskCreated = (newTask) => {
            updateCachedData((draft) => {
              draft?.data?.unshift(newTask);
            });
          };

          // Attach socket listeners
          socket.on("taskCreated", handleTaskCreated);

          // Clean up on cache entry removal
          await cacheEntryRemoved;
          socket.off("taskCreated", handleTaskCreated);
        } catch (error) {
          console.error("Error handling socket events:", error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
