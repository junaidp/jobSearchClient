// This is the Entire Grid for the user Data and using the components of the GridComponents in components/GridComponents

import React from "react";
import GridHeaders from "../components/JobsComponents/GridHeader";
import GridMain from "../components/JobsComponents/GridMain";
import GrifFooter from "../components/JobsComponents/GridFooter";
import "../components/JobsComponents/index.css";
import PopUp from "../components/JobsComponents/PopUp"

const Grid = () => {
  return (
    <div>
      <PopUp/>
    <div className="gridMain">
      <GridHeaders />
      <GridMain />
      <GrifFooter />
    </div>
    </div>
  );
};

export default Grid;
