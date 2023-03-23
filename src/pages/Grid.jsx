// This is the Entire Grid for the user Data and using the components of the GridComponents in components/GridComponents

import React from "react";
import GridHeaders from "../components/GridComponents/GridHeader";
import GridMain from "../components/GridComponents/GridMain";
import GrifFooter from "../components/GridComponents/GridFooter";
import "../components/GridComponents/index.css";
import PopUp from "../components/GridComponents/PopUp"

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
