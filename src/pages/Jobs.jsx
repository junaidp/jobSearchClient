// This is the Entire Grid for the user Data and using the components of the GridComponents in components/GridComponents

import React from "react";
import GridMain from "../components/JobsComponents/GridMain";
import "../components/JobsComponents/index.css";
import PopUp from "../components/JobsComponents/PopUp";

const Grid = () => {
  return (
    <div>
      <PopUp />
      <GridMain />
    </div>
  );
};

export default Grid;
