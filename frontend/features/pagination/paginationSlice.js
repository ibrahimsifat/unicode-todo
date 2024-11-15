import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    pageSize: 3,
    priority: "all",
    todaytask: false,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    todayTask(state, action) {
      state.todaytask = action.payload;
    },
    resetPagination(state) {
      state.page = 1;
      state.pageSize = 10;
      state.priority = "all";
      state.todaytask = false;
    },
  },
});

export const { setPage, setPageSize, resetPagination, setPriority, todayTask } =
  paginationSlice.actions;
export default paginationSlice.reducer;
