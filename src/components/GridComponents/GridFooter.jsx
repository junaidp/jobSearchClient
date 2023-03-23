// This is the last part of the grid where we have the pagination stuff 
// The Pagination and the dropdown and the Go to Page Feature

import React from "react";
import FormRowSelect from "./FormRowSelect";
import PaginationMain from "./PaginationMain";
import {
  handleInputPage,
  handleSelectPage,
  handleInputForm,
} from "../../features/pageSlice";
import { useSelector, useDispatch } from "react-redux";

const GridFooter = () => {
  let dispatch = useDispatch();
  let {
    selectPage: rowPerPage,
    paginationPage,
    totalPages,
    data,
  } = useSelector((store) => store.store);
  let [selectPage, setSelectPage] = React.useState(rowPerPage);

  function handleChangeSelect(e) {
    setSelectPage(e.target.value);
  }

  function submitInput(event) {
    event.preventDefault();
    dispatch(handleInputForm());
  }

  let [InputPage, setInputPage] = React.useState(1);
  function handleChangeInput(e) {
    setInputPage(e.target.value);
  }

  React.useEffect(() => {
    dispatch(handleSelectPage({ page: selectPage }));
  }, [selectPage]);

  React.useEffect(() => {
    dispatch(handleInputPage({ page: InputPage }));
  }, [InputPage]);

  let list = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="tableFooterMain">
      <p>
        Showing   Page{paginationPage} / {totalPages}  with {data.length}  entries
      </p>
      <div>
        <PaginationMain />
      </div>
      <FormRowSelect
        value={selectPage}
        handleChange={handleChangeSelect}
        name="page"
        list={list}
      />

      <form className="pageInputMain" onSubmit={submitInput}>
        <label>
          <p>Go To Page</p>
        </label>
        <input
          type="Text"
          value={InputPage}
          name="page"
          onChange={handleChangeInput}
          className="pageInput"
        />
      </form>
    </div>
  );
};

export default GridFooter;
