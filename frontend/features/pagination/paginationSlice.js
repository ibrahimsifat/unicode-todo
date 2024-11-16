import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    pageSize: 3,
    priority: "all",
    todaytask: false,
    remainingTaskPage: 1,
    remainingTaskPageSize: 3,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setRemainingTaskPage(state, action) {
      state.remainingTaskPage = action.payload;
    },
    setRemainingTaskPageSize(state, action) {
      state.remainingTaskPageSize = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    todayTask(state, action) {
      state.todaytask = action.payload;
    },
    resetPagination(state) {
      state.page = 1;
      state.pageSize = 3;
      state.priority = "all";
      state.todaytask = false;
      state.remainingTaskPage = 1;
      state.remainingTaskPageSize = 3;
    },
  },
});

export const {
  setPage,
  setPageSize,
  resetPagination,
  setPriority,
  todayTask,
  setRemainingTaskPage,
  setRemainingTaskPageSize,
} = paginationSlice.actions;
export default paginationSlice.reducer;
