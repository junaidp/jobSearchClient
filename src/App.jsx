import React from "react";
import "./App.css";
import { Tabs } from "./pages/index";
import axios from "axios";

const App = () => {
  // The Last Run Finished
  React.useEffect(()=>{
    const start=async ()=>{
      let {data}=await axios.get("https://searchjobserver.herokuapp.com/JobSearch/crawler/runInfo")
      sessionStorage.setItem("endTime",JSON.stringify(data[0].endTime))
    }
    start()
  },[])
  return (
    <div className="appMain">
      <Tabs />
    </div>
  );
};

export default App;
