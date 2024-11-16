import { apiSlice } from "../api/apiSlice";
import socket from "../socket";
import { tasksApi } from "../task/tasksApi";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: (result, error, { task_id }) => [
      //   { type: "Task", id: task_id },
      // ],

      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTask", data.task_id, (draft) => {
            draft.assignments.push({
              user_id: data.user_id,
              role: data.role,
            });
          })
        );

        try {
          const { data: addedAssignment } = await queryFulfilled;
          if (socket?.connected)
            socket.emit("assignmentAdded", addedAssignment);
        } catch (error) {
          patchResult.undo(); // Revert optimistic update on failure
          console.error("Failed to add assignment", error);
        }
      },
    }),

    updateAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedAssignment } = await queryFulfilled;
          if (socket.connected)
            socket.emit("assignmentUpdated", updatedAssignment);
        } catch (error) {
          console.error("Failed to update assignment", error);
        }
      },
    }),

    deleteAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments?task_id=${data.task_id}&user_id=${data.user_id}`,
        method: "DELETE",
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (socket.connected)
            socket.emit("assignmentDeleted", data.task_id, data.user_id);
        } catch (error) {
          console.error("Failed to delete assignment", error);
        }
      },
    }),
  }),
});

export const {
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
