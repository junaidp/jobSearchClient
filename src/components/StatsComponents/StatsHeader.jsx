// This is the First part of the Stats and and the header part

import React from "react";
import { handleSearchStats } from "../../features/statsSlice";
import { useDispatch, useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import Chip from '@mui/material/Chip';

const GridHeader = () => {
  let { searchStats } = useSelector((state) => state.stats);
  let { withOutFilterData } = useSelector((state) => state.stats);
  let dispatch = useDispatch();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData) => {
    let newData = apiData.map((items) => {
      return {
        HospitalName: items?.name,
        Jobs: items?.vac,
        Url: items?.url,
        Location: items?.location,
        notVac: items?.notVac,
      };
    });
    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "myFile" + fileExtension);
  };


  let [keys,setKeys]=React.useState([])
  let [values,setValues]=React.useState([])
  React.useEffect(()=>{
   let start=async ()=>{
     let {data}=await axios.get("https://searchjobserver.herokuapp.com/JobCount/Stats")
     let keysData=Object.keys(data)
     let valuesData=Object.values(data)
     setKeys(keysData)
     setValues(valuesData)
   }
   start()
  },[])

  // The Jobs Usage
  let {loading}=useSelector((state)=>state.jobs)

  return (
    <div className="headersMain statsHeaderMain">
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <div className="chips">
        <button
          onClick={(e) => exportToCSV(withOutFilterData)}
          className={`search greenBtn ${loading ? "disabledBtn" : ""}`}
          style={{width:"150px",height:"44px"}}
       >
          Download Stats
        </button>
          {
            keys?.map((item,i)=>{
              // return  <Chip label={item(values[i])} />
              return <div className="chip" key={i}>
                <p>{item?item:""}</p>
                <p>{values[i]?values[i]:''}</p>
              </div>
            })
          }
        </div>
      </div>
      <div className="headersIcons">
        <input
          name="copy-button"
          aria-label="copy-button"
          className="commomTextFields statsTextField"
          value={searchStats}
          style={{ height: "5px" }}
          onChange={(e) =>
            dispatch(handleSearchStats({ search: e.target.value }))
          }
          placeholder="Search Here..."
        />
      </div>
    </div>
  );
};

export default GridHeader;
