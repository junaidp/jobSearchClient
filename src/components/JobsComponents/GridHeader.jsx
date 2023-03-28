// This is the First part of the Grid and and the header part

import React from "react";
import { handleSearch } from "../../features/jobsSlice";
import { useDispatch, useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const GridHeader = () => {
  let { search } = useSelector((state) => state.jobs);
  let { withOutFilterData } = useSelector((state) => state.jobs);
  let dispatch = useDispatch();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData) => {
    let newData = apiData.map((items) => {
      return {
        Title: items?.title,
        HospitalName: items?.hospitalName,
        Location: items?.location,
        Url: items?.url,
        FirstFound: items?.addedDate,
      };
    });
    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "myFile" + fileExtension);
  };

  return (
    <div className="headersMain">
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <a className="jobsHeading">Jobs</a>
        <button
          onClick={(e) => exportToCSV(withOutFilterData)}
          style={{
            padding: "5px",
            background: "green",
            outline: "none",
            border: "2px solid green",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Download Jobs
        </button>
      </div>
      <div className="headersIcons">
        <input
          name="copy-button"
          aria-label="copy-button"
          value={search}
          style={{ height: "5px" }}
          onChange={(e) => dispatch(handleSearch({ search: e.target.value }))}
          placeholder="Search Here..."
        />
      </div>
    </div>
  );
};

export default GridHeader;
