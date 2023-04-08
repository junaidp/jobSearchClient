// This is the First part of the Grid and and the header part

import React from "react";
import { handleSearch } from "../../features/jobsSlice";
import { useDispatch, useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";


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
        ID: items?.id,
        Title: items?.title,
        jobType: items?.jobType?items?.jobType:"Empty",
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

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const urlApi = async () => {
    setOpen(true);
    // let { data } = await axios.get(
    //   "https://searchjobserver.herokuapp.com/JobSearch/crawler/byUrl"
    // );
  };

  let lastDate=JSON.parse(sessionStorage.getItem("endTime"))

  return (
    <div className="headersMain headersMainJobs">
      <p>last run finished:<span className="lastDate">{lastDate}</span></p>
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {/* This is Prop Starts */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Alert severity="info">
                This will start the crawler on all the available jobs in excel ,
                are you sure ?
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Yes, I Agree</Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* This is Prop Ends */}
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
          placeholder="Search Globally..."
          className="headerTextField"
        />
      </div>
      <button
        onClick={urlApi}
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
        Run Crawler
      </button>
    </div>
  );
};

export default GridHeader;
