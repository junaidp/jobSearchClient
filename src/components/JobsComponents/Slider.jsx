// If You click the "Attraction Link" You see the slider this is this

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { changeRadius } from "../../features/jobsSlice";
import { useSelector, useDispatch } from "react-redux";

const StopSlider = ({ ref }) => {
  let dispatch = useDispatch();
  let { radius } = useSelector((state) => state.jobs);

  // const marks = [
  //   {
  //     value: 0,
  //     label: "0km",
  //   },
  //   {
  //     value: 1000,
  //     label: "1000km",
  //   },
  //   {
  //     value: 2500,
  //     label: "2500km",
  //   },
  //   {
  //     value: 5000,
  //     label: "5000km",
  //   },
  // ];
  const marks = [
    {
      value: 0,
      label: "0km",
    },
    {
      value: 300,
      label: "300km",
    },
    {
      value: 700,
      label: "700km",
    },
    {
      value: 1000,
      label: "1000km",
    },
  ];

  const valuetext = (value) => {
    return `${value}km`;
  };

  return (
    <Box className="sliderBox">
      <Slider
        style={{ width: "90%", marginLeft: "10px" }}
        className="slider"
        aria-label="Custom marks"
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        onChange={(e) => dispatch(changeRadius(e.target.value))}
        inputRef={ref}
        value={radius}
        min={0}
        max={1000}
        marks={marks}
        step={null}
      />
    </Box>
  );
};

export default StopSlider;
