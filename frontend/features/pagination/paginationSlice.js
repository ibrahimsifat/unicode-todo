import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    pageSize: 3,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    resetPagination(state) {
      state.page = 1;
      state.pageSize = 10;
    },
  },
});

export const { setPage, setPageSize, resetPagination } =
  paginationSlice.actions;
export default paginationSlice.reducer;
