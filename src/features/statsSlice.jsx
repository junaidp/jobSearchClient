// This is the Store to add the common data for the app and the store Entry Point is in the store/Store.jsx and the whole store in wrapped in the parent of the whole app which is main.jsx

// Note: This Slice is only for the Stats

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  paginationPage: 1,
  selectPage: 30,
  inputPage: 1,
  searchStats: "",
  totalPages: 10,
  data: [],
  withOutFilterData:[],
  hospitalSort:false,
  jobsSort:false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handlePaginationPageStats: (state, action) => {
      state.paginationPage = action.payload.page;
    },
    clearSearch: (state) => {
      state.searchStats = "";
    },
    handleSelectPageStats: (state, action) => {
      state.selectPage = action.payload.page;
      state.paginationPage = 1;
    },
    handleInputPageStats: (state, action) => {
      state.inputPage = action.payload.page;
    },
    handleSearchStats: (state, action) => {
      state.searchStats = action.payload.search;
    },
    handleTotalPages: (state, action) => {
      state.totalPages = action.payload.pages;
    },
    setDataStats: (state, action) => {
      state.data = action.payload.data;
      state.withOutFilterData=action.payload.data
      state.totalPages = Math.ceil(
        action.payload.data.length / state.selectPage
      );
    },
    handleInputFormStats: (state) => {
      if (
        Number(state.inputPage) <= state.totalPages &&
        Number(state.inputPage > 0)
      ) {
        state.paginationPage = Number(state.inputPage);
      }
    },

    handleHospitalNameSortStats: (state) => {
      if (state.hospitalSort) {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.name.toUpperCase() || "";
          var textB = b?.name.toUpperCase() || "";
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.name.toUpperCase() || "";
          var textB = b?.name.toUpperCase() || "";
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.hospitalSort= !state.hospitalSort
    },

    handleJobsSortStats: (state) => {
      if (state.jobsSort) {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.vac || "";
          var textB = b?.vac || "";
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.vac || "";
          var textB = b?.vac || "";
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.jobsSort= !state.jobsSort
    },

  },
});

export const {
  handlePaginationPageStats,
  handleInputPageStats,
  handleSelectPageStats,
  handleSearchStats,
  handleTotalPages,
  setDataStats,
  handleInputFormStats,
  clearSearch,
  handleHospitalNameSortStats,
  handleJobsSortStats
} = userSlice.actions;

export default userSlice.reducer;
