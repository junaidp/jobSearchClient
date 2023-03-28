// This is the pagination stuff we are using in the gridFooter

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handlePaginationPage } from "../../features/jobsSlice";
import Pagination from "@mui/material/Pagination";
function PaginationMain() {
  let dispatch = useDispatch();
  let { paginationPage, totalPages, inputPage } = useSelector(
    (state) => state.jobs
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
