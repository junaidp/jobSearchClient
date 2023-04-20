// This is the main part of the stats where we have the List of the HoptipalName with their JobsNo and url stuff.

import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import axios from "axios";
import { Highlighter } from "highlight-react-text";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTotalPages,
  setDataStats,
  handleHospitalNameSortStats,
  handleJobsSortStats,
  handleJobsLocaionSortStats,
  handleJobsErrorNumSortStats,
  handleNotVacSortStats,
} from "../../features/statsSlice";
import DialogBox from "./ErrorDialogBox";

import CircularProgress from "@mui/material/CircularProgress";
// import moment from "moment/moment";
import "./index.css";

// The Jobs Usage
import {  loadingTrue,
  loadingFalse}  from "../../features/jobsSlice"


const GridMain = () => {
  let [errorMessages, setErrorMessages] = React.useState([]);
  let [dialog, setDialog] = React.useState(false);
  // let [loading, setLoading] = React.useState(true);
  let dispatch = useDispatch();
  let {
    paginationPage,
    selectPage,
    searchStats,
    data: dummyData,
  } = useSelector((state) => state.stats);

  let {loading}=useSelector((state)=>state.jobs)

  // This UseEffect is to change the total Pages Logic
  React.useEffect(() => {
    dispatch(
      handleTotalPages({ pages: Math.ceil(dummyData.length / selectPage) })
    );
  }, [selectPage]);

  // Fetching Data from the data base
  React.useEffect(() => {
    let start = async () => {
      try {
        // setLoading(true);
        dispatch(loadingTrue())
        let { data } = await axios.get(
          "https://searchjobserver.herokuapp.com/JobSearch/crawler/count"
        );
        dispatch(setDataStats({ data: data }));
        dispatch(loadingFalse())
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    start();
  }, []);

  // The Error Dialog Box
  function errorHandler(errMessages) {
    if (errMessages !== null && errMessages.length !== 0) {
      setDialog(true);
      setErrorMessages(errMessages);
    }
  }

  // When the User Click the link it will be shown in the new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  if (loading) {
    return <CircularProgress />;
  }

  // The Searching Logic
  // This will for any of the in this way like you search for "wan" and then it will look in the title,description and location and hospitalName tables and come with the row that include the "wan"  keyword
  const keys = ["name", "url", "location"];

  return (
    <div className="TableDataMain">
      <DialogBox
        dialog={dialog}
        messages={errorMessages}
        setDialog={setDialog}
      />
      <div>
        {/* Here Starts / This is the main heading of the title,description,url,date,location... */}
        <div className="gridStatsHead">
          {/*  */}
          <div
            className="gridHeadSingle statsHeadName"
            onClick={() => dispatch(handleHospitalNameSortStats())}
          >
            <a>Hospital Name</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
          {/*  */}

          <div
            className="gridHeadSingle statsHeadJobs"
            onClick={() => dispatch(handleJobsSortStats())}
          >
            <a>Jobs</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          <div className="gridHeadSingle statsHeadUrl">
            <a>URL</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          <div
            className="gridHeadSingle statsHeadLocation"
            onClick={() => dispatch(handleJobsLocaionSortStats())}
          >
            <a>Location</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
          {/*  */}
          <div
            className="gridHeadSingle statsHeadErrorNum"
            onClick={() => dispatch(handleJobsErrorNumSortStats())}
          >
            <a>errors</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
          {/*  */}

          <div
            className="gridHeadSingle statsHeadNotVac"
            onClick={() => dispatch(handleNotVacSortStats())}
          >
            <a>Not Relevant</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
        </div>
        {/* Here Ends the Headers which is teh first row of the grid title,description... */}

        <div className="headLine"></div>

        {/* Here Starts the main grid data  */}
        <div>
          {dummyData
            .filter((item) =>
              keys?.some((key) =>
                item[key]?.toLowerCase()?.includes(searchStats?.toLowerCase())
              )
            )
            .slice(
              paginationPage * selectPage - selectPage,
              paginationPage * selectPage
            )
            .map((row,index) => {
              return (
                <div className="gridWrapper" key={index}>
                  <div className="statsBody">
                    {/*  */}
                    <div className="statsBodyName">
                      <Highlighter searchText={searchStats}>
                        {row?.name ? row?.name : ""}
                      </Highlighter>
                    </div>

                    {/* Hospital Name Column */}
                    <div className="statsBodyJobs">
                      <div searchText={searchStats}>{row?.vac}</div>
                    </div>
                    {/*  */}
                    <div
                      className="statsBodyUrl jobsUrl"
                      onClick={() => openInNewTab(row?.url)}
                    >
                      <Highlighter searchText={searchStats}>
                        {row?.url ? row?.url : ""}
                      </Highlighter>
                    </div>
                    {/*  */}
                    <div className="statsBodyLocation">
                      <Highlighter searchText={searchStats}>
                        {row?.location ? row?.location : ""}
                      </Highlighter>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div
                      className="statsBodyErrorNum"
                      onClick={() => errorHandler(row?.errorMessage)}
                    >
                      <div>
                        {row?.errorMessage && row?.errorNum !== 0 && (
                          <button className="errorBtn">
                            {row?.errorNum} errors
                          </button>
                        )}
                      </div>
                    </div>
                    {/*  */}

                    <div className="statsBodyNotVac">
                      <div searchText={searchStats}>{row?.notVac}</div>
                    </div>
                    {/*  */}
                    {/*  */}
                  </div>
                  <div className="RowsLine"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GridMain;
