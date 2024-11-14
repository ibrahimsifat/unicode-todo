import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
      transformResponse(apiResponse, meta) {
        return {
          data: apiResponse,
          totalCount: meta.response.headers.get("X-Total-Count"),
        };
      },
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }
      ) {
        const receiverEmail = getState().user?.user.email;

        // create socket
        const socket = io(process.env.REACT_APP_API_URL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });

        try {
          await cacheDataLoaded;

          socket.on("tasks", (data) => {
            updateCachedData((draft) => {
              if (data?.data?.receiver?.email === receiverEmail) {
                draft?.data?.unshift(data?.data);
              } else {
                //do nothing here
              }
            });
          });
        } catch (error) {
          await cacheEntryRemoved;
          socket.close();
        }
      },
    }),
    // getMoreTasks: builder.query({
    //   query: ({ id, page }) =>
    //     `/tasks?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
    //   async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
    //     try {
    //       const tasks = await queryFulfilled;

    //       if (tasks?.data?.length) {
    //         // update get conversations cache pessimistically start
    //         dispatch(
    //           apiSlice.util.updateQueryData("getTasks", id, (draft) => {
    //             return {
    //               data: [...draft.data, ...tasks.data],
    //               totalCount: Number(draft.totalCount),
    //             };
    //           })
    //         );
    //         // update tasks cache pessimistically end
    //       }
    //     } catch (err) {}
    //   },
    // }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
