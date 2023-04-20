import * as React from "react";
// Mui imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Header from "./GridHeader";
import Footer from "./GridFooter";

// images
import FilterImg from "../../assets/filter.svg";
import moment from "moment";

import axios from "axios";
import { Highlighter } from "highlight-react-text";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTotalPages,
  setData,
  handleLocationSort,
  handleTitleSort,
  handleDateSort,
  handleHospitalNameSort,
  handleJobTypeSort,

  //The Filter on the Column
  handleChangeTextField,
  stopJobSearch,
  stopSubSearch,
  searchOnColumns,

  // The Rdius Filter
  loadingTrue,
  loadingFalse,
} from "../../features/jobsSlice";

const UpcomingItemsTable = () => {
  // let [loading, setLoading] = React.useState(true);
  let dispatch = useDispatch();
  let {
    paginationPage,
    selectPage,
    search,
    data: dummyData,
    titleFilter,
    jobTypeFilter,
    nameFilter,
    locationFilter,
    loading,
  } = useSelector((state) => state.jobs);

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
        dispatch(loadingTrue());
        let { data } = await axios.get(
          "https://searchjobserver.herokuapp.com/JobSearch/crawler/all",
          { login: "root", password: "root" }
        );
        dispatch(setData({ data: data }));
        dispatch(loadingFalse());
        // setLoading(false);
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

  React.useEffect(() => {
    dispatch(stopJobSearch());
  }, [titleFilter, jobTypeFilter, nameFilter, locationFilter]);

  React.useEffect(() => {
    dispatch(searchOnColumns());
  }, [titleFilter, jobTypeFilter, nameFilter, locationFilter]);

  React.useEffect(() => {
    dispatch(stopSubSearch());
  }, [search]);

  // The Searching Logic
  // This will for any of the in this way like you search for "wan" and then it will look in the title,description and location and hospitalName tables and come with the row that include the "wan"  keyword
  const keys = ["title", "location", "url", "hospitalName", "jobType"];


  return (
    <TableContainer
      component={Paper}
      className="UpcomingItemsCout jobsTableMain"
      style={{ width: "95%", transform: "translateX(-50%)", marginLeft: "50%" }}
      filter={search}
    >
      <Header />
      {loading ? (
        <CircularProgress />
      ) : (
        <Table aria-label="caption table" className="UpcomingItemsTable">
          <TableHead>
            <TableRow>
              <TableCell className="headerHeading headerHeadingId">
                ID <img src={FilterImg} className="filterImg" />
              </TableCell>

              <TableCell className="headerHeading">
                <input
                  placeholder="Title"
                  className="textFields commomTextFields"
                  value={titleFilter}
                  onChange={(e) =>
                    dispatch(
                      handleChangeTextField({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  name="titleFilter"
                />
                <div onClick={() => dispatch(handleTitleSort())}>
                  Title <img src={FilterImg} className="filterImg" />
                </div>
              </TableCell>

              <TableCell className="headerHeading">
                <input
                  placeholder="Type"
                  className="textFields commomTextFields"
                  value={jobTypeFilter}
                  name="jobTypeFilter"
                  onChange={(e) =>
                    dispatch(
                      handleChangeTextField({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
                <div onClick={() => dispatch(handleJobTypeSort())}>
                  jobType <img src={FilterImg} className="filterImg" />
                </div>
              </TableCell>

              <TableCell className="headerHeading">
                <input
                  placeholder="Name"
                  className="textFields commomTextFields"
                  name="nameFilter"
                  value={nameFilter}
                  onChange={(e) =>
                    dispatch(
                      handleChangeTextField({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
                <div onClick={() => dispatch(handleHospitalNameSort())}>
                  Hospital Name <img src={FilterImg} className="filterImg" />
                </div>
              </TableCell>

              <TableCell className="headerHeading">
                <input
                  placeholder="location"
                  className="textFields commomTextFields"
                  name="locationFilter"
                  value={locationFilter}
                  onChange={(e) =>
                    dispatch(
                      handleChangeTextField({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
                <div onClick={() => dispatch(handleLocationSort())}>
                  Location <img src={FilterImg} className="filterImg" />
                </div>
              </TableCell>

              <TableCell className="headerHeading headerHeadingUrl">
                Url <img src={FilterImg} className="filterImg" />
              </TableCell>
              <TableCell
                onClick={() => dispatch(handleDateSort())}
                className="headerHeading headerHeadingFirstFound"
              >
               First Found    <img src={FilterImg} className="filterImg" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData
              .filter((item) =>
                keys?.some((key) =>
                  item[key]?.toLowerCase()?.includes(search?.toLowerCase())
                )
              )
              .slice(
                paginationPage * selectPage - selectPage,
                paginationPage * selectPage
              )
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item?.id}
                  </TableCell>
                  <TableCell className="jobsGridBody">
                    <Highlighter searchText={search}>
                      {item?.title ? item?.title : ""}
                    </Highlighter>
                  </TableCell>
                  <TableCell className="jobsGridBody">
                    <Highlighter searchText={search}>
                      {item?.jobType ? item?.jobType : ""}
                    </Highlighter>
                  </TableCell>
                  <TableCell className="jobsGridBody">
                    <Highlighter searchText={search}>
                      {item?.hospitalName ? item?.hospitalName : ""}
                    </Highlighter>
                  </TableCell>
                  <TableCell className="jobsGridBody">
                    <Highlighter searchText={search}>
                      {item?.location ? item?.location : ""}
                    </Highlighter>
                  </TableCell>
                  <TableCell
                    onClick={() => openInNewTab(item?.url)}
                    className="link jobsGridBody"
                  >
                    <Highlighter searchText={search}>
                      {item?.url ? item?.url : ""}
                    </Highlighter>
                  </TableCell>
                  <TableCell>
                    {moment(item?.addedDate).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      <Footer />
    </TableContainer>
  );
};

export default UpcomingItemsTable;
