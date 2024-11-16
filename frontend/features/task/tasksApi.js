import { apiSlice } from "../api/apiSlice";
import socket from "../socket";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (page) =>
        `/tasks?page=${page.page}&pageSize=${page.pageSize}&priority=${page.priority}&todaytask=${page.todaytask}`,
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

          // Task event listeners
          const handleTaskCreated = (newTask) => {
            if (newTask?.receiver?.email === receiverEmail) {
              updateCachedData((draft) => {
                draft?.data?.unshift(newTask);
              });
            }
          };

          const handleTaskUpdated = (updatedTask) => {
            updateCachedData((draft) => {
              const taskIndex = draft?.data?.findIndex(
                (task) => task._id === updatedTask._id
              );
              if (taskIndex !== -1) {
                draft.data[taskIndex] = {
                  ...draft.data[taskIndex],
                  ...updatedTask,
                };
              }
            });
          };

          const handleTaskDeleted = (deletedTaskId) => {
            updateCachedData((draft) => {
              draft.data = draft?.data?.filter(
                (task) => task._id !== deletedTaskId
              );
            });
          };

          // Attach event listeners
          socket.on("taskCreated", handleTaskCreated);
          socket.on("taskUpdated", handleTaskUpdated);
          socket.on("taskDeleted", handleTaskDeleted);

          // Clean up on cache entry removal
          await cacheEntryRemoved;
          socket.off("taskCreated", handleTaskCreated);
          socket.off("taskUpdated", handleTaskUpdated);
          socket.off("taskDeleted", handleTaskDeleted);
        } catch (error) {
          console.error("Error in socket event handling:", error);
        }
      },
    }),
    getTask: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
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
          if (socket.connected) socket.emit("taskAdded", addedTask);
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
          if (socket.connected) socket.emit("taskUpdated", updatedTask);
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
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.data.find((task) => task.id === id);
            if (task) task.status = status;
          })
        );

        try {
          await queryFulfilled;
        } catch {
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
          if (socket.connected) socket.emit("taskDeleted", id);
        } catch (error) {
          console.error("Failed to delete task", error);
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleStatusMutation,
} = tasksApi;
