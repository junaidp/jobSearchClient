// This is the First part of the Stats and and the header part

import React from "react";
import { handleSearchStats } from "../../features/statsSlice";
import { useDispatch, useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const GridHeader = () => {
  let { searchStats } = useSelector((state) => state.stats);
  let { withOutFilterData } = useSelector((state) => state.stats);
  let dispatch = useDispatch();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData) => {
    let newData = apiData.map((items) => {
      return {
        HospitalName: items?.name,
        Jobs: items?.vac,
        Url: items?.url,
        Location: items?.location,
        notVac: items?.notVac,
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
          Download Stats
        </button>
      </div>
      <div className="headersIcons">
        <input
          name="copy-button"
          aria-label="copy-button"
          value={searchStats}
          style={{ height: "5px" }}
          onChange={(e) =>
            dispatch(handleSearchStats({ search: e.target.value }))
          }
          placeholder="Search Here..."
        />
      </div>
    </div>
  );
};

export default GridHeader;
