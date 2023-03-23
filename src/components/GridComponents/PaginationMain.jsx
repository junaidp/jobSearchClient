// This is advance Pagination Component in which we can tell how many pages we want and is divided in the two parts for the simplicity and is using the PaginationSub.jsx and this PaginationMain.jsx is in the GridFooter.jsx

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handlePaginationPage } from "../../features/pageSlice";
import Pagination from "@mui/material/Pagination";
function PaginationMain() {
  let dispatch = useDispatch();
  let { paginationPage, totalPages, inputPage } = useSelector(
    (state) => state.store
  );

  const [page, setPage] = React.useState(paginationPage);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    dispatch(handlePaginationPage({ page: page }));
  }, [page]);

  React.useEffect(() => {
    setPage(paginationPage);
  }, [paginationPage]);

  return (
    <div className="container mt-5">
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}

export default PaginationMain;
