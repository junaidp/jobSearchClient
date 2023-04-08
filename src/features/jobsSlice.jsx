// This is the Store to add the common data for the app and the store Entry Point is in the store/Store.jsx and the whole store in wrapped in the parent of the whole app which is main.jsx

// Note: This Slice is only for the Jobs

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  paginationPage: 1,
  selectPage: 30,
  inputPage: 1,
  search: "",
  totalPages: 10,
  data: [],
  titleSort: false,
  descriptionSort: false,
  locationSort: false,
  dateSort: false,
  jobTypeSort: false,
  withOutFilterData: [],
  hospitalSort: false,

  // The Filters On Each Column
  titleFilter: "",
  jobTypeFilter: "",
  nameFilter: "",
  locationFilter: "",
};

const jobsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handlePaginationPage: (state, action) => {
      state.paginationPage = action.payload.page;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    handleSelectPage: (state, action) => {
      state.selectPage = action.payload.page;
      state.paginationPage = 1;
    },
    handleInputPage: (state, action) => {
      state.inputPage = action.payload.page;
    },
    handleSearch: (state, action) => {
      state.search = action.payload.search;
    },
    handleTotalPages: (state, action) => {
      state.totalPages = action.payload.pages;
    },
    setData: (state, action) => {
      state.data = action.payload.data;
      state.withOutFilterData = action.payload.data;
      state.totalPages = Math.ceil(
        action.payload.data.length / state.selectPage
      );
    },

    // The Filter on Each Column

    stopJobSearch: (state) => {
      state.search = "";
    },
    stopSubSearch: (state) => {
      state.jobTypeFilter = "";
      state.nameFilter = "";
      state.locationFilter = "";
      state.titleFilter = "";
    },
    searchOnColumns: (state) => {
      let dummyData = state.withOutFilterData;
      if (state.titleFilter) {
        dummyData = dummyData.filter((item) =>
          item?.title?.toUpperCase().includes(state.titleFilter.toUpperCase())
        );
      }
      if (state.jobTypeFilter) {
        dummyData = dummyData.filter((item) =>
          item?.jobType
            ?.toUpperCase()
            .includes(state.jobTypeFilter.toUpperCase())
        );
      }
      if (state.nameFilter) {
        dummyData = dummyData.filter((item) =>
          item?.hospitalName
            ?.toUpperCase()
            .includes(state.nameFilter.toUpperCase())
        );
      }
      if (state.locationFilter) {
        dummyData = dummyData.filter((item) =>
          item?.location
            ?.toUpperCase()
            .includes(state.locationFilter.toUpperCase())
        );
      }
      state.data = dummyData;
    },
    handleChangeTextField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    handleInputForm: (state) => {
      if (
        Number(state.inputPage) <= state.totalPages &&
        Number(state.inputPage > 0)
      ) {
        state.paginationPage = Number(state.inputPage);
      }
    },

    handleTitleSort: (state) => {
      if (state.titleSort) {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.title?.toUpperCase();
          var textB = b?.title?.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.title?.toUpperCase();
          var textB = b?.title?.toUpperCase();
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.titleSort = !state.titleSort;
    },

    handleDescriptionSort: (state) => {
      if (state.descriptionSort) {
        state.data = state?.data?.sort(function (a, b) {
          var textA = a?.description?.toUpperCase();
          var textB = b?.description?.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.description?.toUpperCase();
          var textB = b?.description?.toUpperCase();
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.descriptionSort = !state.descriptionSort;
    },

    handleLocationSort: (state) => {
      if (state.locationSort) {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.location?.toUpperCase();
          var textB = b?.location?.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.location?.toUpperCase();
          var textB = b?.location?.toUpperCase();
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.locationSort = !state.locationSort;
    },

    handleHospitalNameSort: (state) => {
      if (state.hospitalSort) {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.hospitalName?.toUpperCase() || "";
          var textB = b?.hospitalName?.toUpperCase() || "";
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.hospitalName?.toUpperCase() || "";
          var textB = b?.hospitalName?.toUpperCase() || "";
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.hospitalSort = !state.hospitalSort;
    },

    handleJobTypeSort: (state) => {
      if (state.jobTypeSort) {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.jobType?.toUpperCase() || "";
          var textB = b?.jobType?.toUpperCase() || "";
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        state.data = state.data.sort(function (a, b) {
          var textA = a?.jobType?.toUpperCase() || "";
          var textB = b?.jobType?.toUpperCase() || "";
          return textA < textB ? 1 : textA > textB ? -1 : 0;
        });
      }
      state.jobTypeSort = !state.jobTypeSort;
    },

    // The Below Sorting Logic is Not Working for the Chrome
    // handleLocationSort: (state) => {
    //   if (state.locationSort) {
    //     state.data = state.data.sort((a, b) => a.location > b.location);
    //   } else {
    //     state.data = state.data.sort((a, b) => a.location < b.location);
    //   }
    //   state.locationSort = !state.locationSort;
    // },

    handleDateSort: (state) => {
      if (state.dateSort) {
        state.data = state.data.sort(
          (a, b) => new Date(a.addedDate) - new Date(b.addedDate)
        );
      } else {
        state.data = state.data.sort(
          (a, b) => new Date(b.addedDate) - new Date(a.addedDate)
        );
      }
      state.dateSort = !state.dateSort;
    },
  },
});

export const {
  handlePaginationPage,
  handleInputPage,
  handleSelectPage,
  handleSearch,
  handleTotalPages,
  setData,
  handleInputForm,
  handleDescriptionSort,
  handleLocationSort,
  handleTitleSort,
  clearSearch,
  handleDateSort,
  handleHospitalNameSort,
  handleJobTypeSort,
  stopJobSearch,

  //  The Single Column Filters
  handleChangeTextField,
  stopSubSearch,
  searchOnColumns,
} = jobsSlice.actions;

export default jobsSlice.reducer;
