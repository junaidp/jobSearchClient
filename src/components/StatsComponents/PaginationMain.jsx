// This is the pagination which we are using in the statsFooter Component

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handlePaginationPageStats } from "../../features/statsSlice";
import Pagination from "@mui/material/Pagination";
function PaginationMain() {
  let dispatch = useDispatch();
  let { paginationPage, totalPages, inputPage } = useSelector(
    (state) => state.stats
  );

  const [page, setPage] = React.useState(paginationPage);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    dispatch(handlePaginationPageStats({ page: page }));
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
