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
  handleJobsSortStats
} from "../../features/statsSlice";


import CircularProgress from "@mui/material/CircularProgress";
// import moment from "moment/moment";
import "./index.css";

const GridMain = () => {
  let [loading, setLoading] = React.useState(true);
  let dispatch = useDispatch();
  let {
    paginationPage,
    selectPage,
    searchStats,
    data: dummyData,
  } = useSelector((state) => state.stats);

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
        setLoading(true);
        let { data } = await axios.get(
          "https://searchjobserver.herokuapp.com/JobSearch/crawler/count"
        );
        dispatch(setDataStats({ data: data }));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    start();
  }, []);

  // When the User Click the link it will be shown in the new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  if (loading) {
    return <CircularProgress />;
  }

  // The Searching Logic
  // This will for any of the in this way like you search for "wan" and then it will look in the title,description and location and hospitalName tables and come with the row that include the "wan"  keyword
  const keys = ["name", "url"];

  return (
    <div className="TableDataMain">
      <div>
        {/* Here Starts / This is the main heading of the title,description,url,date,location... */}
        <div className="gridStatsHead">
          {/*  */}
          <div className="gridHeadSingle statsHeadName" onClick={()=>dispatch(handleHospitalNameSortStats())}>
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

          <div
            className="gridHeadSingle statsHeadUrl"
            // onClick={() => dispatch(handleHospitalNameSort())}
          >
            <a>URL</a>
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
            .map((row) => {
              return (
                <div className="gridWrapper">
                  <div className="statsBody">
                    {/*  */}
                    <div className="statsBodyName">
                      <Highlighter searchText={searchStats}>{row?.name}</Highlighter>
                    </div>

                    {/* Hospital Name Column */}
                    <div className="statsBodyJobs">
                      <div searchText={searchStats}>{row?.vac}</div>
                    </div>
                    {/*  */}
                    <div className="statsBodyUrl jobsUrl"
                      onClick={() => openInNewTab(row?.url)}>
                      <Highlighter searchText={searchStats}>{row?.url}</Highlighter>
                    </div>
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
