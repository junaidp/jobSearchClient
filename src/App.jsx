import React from "react";
import "./App.css";
import { Tabs } from "./pages/index";
import axios from "axios";

// Google AutComplete
import { useJsApiLoader } from "@react-google-maps/api";


const libraries = ["places"];

const App = () => {
  // Google AutComplete
  let libRef = React.useRef(libraries);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCf02s6yOXlZBU8ikFcFBB5bHXZWCoY_T0",
    // googleMapsApiKey: "AIzaSyDWNrRa2YUZht-FN8M3ZzJ_i5jMbse3NlM",
    libraries: libRef.current,
    // libraries: ["places"],
  });
  // The Last Run Finished
  React.useEffect(() => {
    const start = async () => {
      let { data } = await axios.get(
        "https://searchjobserver.herokuapp.com/JobSearch/crawler/runInfo"
      );
      sessionStorage.setItem(
        "endTime",
        JSON.stringify(data[data.length - 1].endTime)
      );
    };
    start();
  }, []);


  if (!isLoaded) {
    return "Google Api Loading...";
  }

  return (
    <div className="appMain">
      <Tabs />
    </div>
  );
};

export default App;
