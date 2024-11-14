import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

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

        try {
          await cacheDataLoaded;

          socket.on("taskAdded", (newTask) => {
            if (newTask?.receiver?.email === receiverEmail) {
              updateCachedData((draft) => {
                draft?.data?.unshift(newTask); // Add the new task to the beginning
              });
            }
          });

          socket.on("taskUpdated", (updatedTask) => {
            updateCachedData((draft) => {
              const taskIndex = draft?.data?.findIndex(
                (task) => task.id === updatedTask.id
              );
              if (taskIndex !== -1) {
                draft.data[taskIndex] = {
                  ...draft.data[taskIndex],
                  ...updatedTask,
                };
              }
            });
          });

          // socket.on("taskDeleted", (deletedTaskId) => {
          //   updateCachedData((draft) => {
          //     draft?.data = draft?.data?.filter((task) => task.id !== deletedTaskId);
          //   });
          // });
        } catch (error) {
          await cacheEntryRemoved;
          socket.close();
        }
      },
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: addedTask } = await queryFulfilled;
          // Emit the taskAdded event to the socket server
          socket.emit("taskAdded", addedTask);
        } catch (error) {
          console.error("Failed to add task", error);
        }
      },
    }),

    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          // Emit the taskUpdated event to the socket server
          socket.emit("taskUpdated", updatedTask);
        } catch (error) {
          console.error("Failed to update task", error);
        }
      },
    }),
    toggleStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        // Optimistically update the task's status in the cache
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.data.find((task) => task.id === id);
            if (task) {
              task.status = status;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert the optimistic update if the request fails
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Emit the taskDeleted event to the socket server
          socket.emit("taskDeleted", id);
        } catch (error) {
          console.error("Failed to delete task", error);
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleStatusMutation,
} = tasksApi;
