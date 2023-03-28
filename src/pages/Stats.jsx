// This is the Entire Grid for the stats Data and using the components of the StatsComponents in components/StatsComponents

import React from "react";
import StatsHeader from "../components/StatsComponents/StatsHeader";
import StatsMain from "../components/StatsComponents/StatsMain";
import StatsFooter from "../components/StatsComponents/StatsFooter";
import "../components/JobsComponents/index.css";

const Grid = () => {
  return (
    <div>
      <div className="gridMain">
        <StatsHeader />
        <StatsMain />
        <StatsFooter />
      </div>
    </div>
  );
};

export default Grid;
