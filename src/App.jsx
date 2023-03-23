import React from "react";
import Grid from "./pages/Grid";
import "./App.css";
import PopUp from "./components/GridComponents/PopUp"

const App = () => {
  return (
    <div className="appMain">
      <PopUp/>
      <Grid />
    </div>
  );
};

export default App;
