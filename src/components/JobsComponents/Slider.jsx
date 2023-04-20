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
  // const marks = [
  //   {
  //     value: 10,
  //     label: "10km",
  //   },
  //   {
  //     value: 20,
  //     label: "20km",
  //   },
  //   {
  //     value: 30,
  //     label: "30km",
  //   },
  //   {
  //     value: 40,
  //     label: "40km",
  //   },
  // ];

  const marks = [
    {
      value: "0km",
    },
    {
      value: "20km",
    },
    {
      value: 37,
    },
    {
      value: 100,
    },
  ];
  

  const valuetext = (value) => {
    return `${value}km`;
  };


  return (
    <Box className="sliderBox">
      {/* <Slider
        style={{ width: "90%", marginLeft: "10px" }}
        className="slider"
        aria-label="Custom marks"
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        onChange={(e) => dispatch(changeRadius(e.target.value))}
        inputRef={ref}
        value={radius}
        min={0}
        max={500}
        // marks={marks}
        step={null}
      /> */}
      <Slider defaultValue={50} aria-label="auto" 
        onChange={(e) => dispatch(changeRadius(e.target.value))}
        value={radius}
        min={0}
        max={500}
        valueLabelDisplay="auto"
      />
      <p>km</p>
    </Box>
  );
};

export default StopSlider;
