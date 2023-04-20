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
import Card from "@mui/material/Card";
import Slider from "./Slider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// The Google API
import { Grid, TextField } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";

import {
  changeRadiusLocationSearch,
  clearFilters,
  jobResultWithLocationRadius,
  loadingTrue,
  loadingFalse,
  setData,
  clearBtnFunctions,
  removeAlert,
} from "../../features/jobsSlice";
import axios from "axios";

const GridHeader = () => {
  let {
    search,
    radiusLocationSearch,
    initialJobsResult,
    radius,
    loading,
    alertText,
  } = useSelector((state) => state.jobs);
  let { withOutFilterData } = useSelector((state) => state.jobs);
  // let [place, setPlace] = React.useState(radiusLocationSearch);

  let dispatch = useDispatch();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData) => {
    let newData = apiData.map((items) => {
      return {
        ID: items?.id,
        Title: items?.title,
        jobType: items?.jobType ? items?.jobType : "Empty",
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

  let lastDate = JSON.parse(sessionStorage.getItem("endTime"));

  const searchLocationRadius = async () => {
    dispatch(loadingTrue());
    let { data } = await axios.post(
      "https://searchjobserver.herokuapp.com/Search/ByLocation",
      { location: radiusLocationSearch, radius: radius }
    );
    dispatch(jobResultWithLocationRadius({ data: data }));
    dispatch(loadingFalse());
    setTimeout(() => {
      dispatch(removeAlert());
    }, 2000);
  };

  const clearLocationRadius = async () => {
    dispatch(clearFilters());
    // setPlace("");
    if (initialJobsResult === false) {
      dispatch(loadingTrue());
      let { data } = await axios.get(
        "https://searchjobserver.herokuapp.com/JobSearch/crawler/all",
        { login: "root", password: "root" }
      );
      // dispatch(setData({ data: data }));
      dispatch(clearBtnFunctions({ data: data }));
      dispatch(loadingFalse());
      setTimeout(() => {
        dispatch(removeAlert());
      }, 2000);
    }
  };

  React.useEffect(() => {
    if (alertText !== "") {
      toast.success(alertText, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [alertText]);

 
  let inputRef = React.useRef();

  function placeChanged() {
    dispatch(changeRadiusLocationSearch(inputRef?.current?.value));
  }

  return (
    <div className="headersMainJobs headersMainJobsBigMain">


      <div className="lastDateAndCard">
        <Card className="jobsHeaderCard">
          <Autocomplete onPlaceChanged={placeChanged}>
            <input
              ref={inputRef}
              placeholder="Location"
              className="headerLocationSearch commomTextFields"
              value={radiusLocationSearch}
              onChange={(e) =>
                dispatch(changeRadiusLocationSearch(e.target.value))
              }
            />
          </Autocomplete>
          <Slider />
          <div className="headersBtn">
            <button
              className={`search ${loading ? "disabledBtn" : ""}`}
              onClick={searchLocationRadius}
            >
              Search
            </button>
            <button
              className={`clear ${loading ? "disabledBtn" : ""}`}
              onClick={clearLocationRadius}
              >
              Clear
            </button>
          </div>
        </Card>
      </div>

      {/*  */}
      <div className="jobsRightSide">
        <p>
          last run finished:<span className="lastDate">{lastDate}</span>
        </p>
        <button
          onClick={(e) => exportToCSV(withOutFilterData)}
          className={`greenBtn jobsBtns ${loading ? "disabledBtn" : ""}`}
          >
          Download Jobs
        </button>
        <div className="headersIcons">
          <input
            name="copy-button"
            aria-label="copy-button"
            value={search}
            style={{ height: "5px" }}
            onChange={(e) => dispatch(handleSearch({ search: e.target.value }))}
            placeholder="Search Globally..."
            className="headerTextField commomTextFields"
            />
        </div>
        <button
          onClick={urlApi}
          className={`greenBtn jobsBtns ${loading ? "disabledBtn" : ""}`}
          >
          Run Crawler
        </button>
      </div>

            <ToastContainer />
      {/*  */}
      {/* <div style={{ display: "flex", gap: "30px", alignItems: "center" }}> */}
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
      {/* </div> */}
    </div>
  );
};

export default GridHeader;
