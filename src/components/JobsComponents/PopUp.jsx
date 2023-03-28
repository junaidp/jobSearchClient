// This is the pop up which we see at the start in we need to provide the correct password to go futher

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "./index.css"

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);

  const [password, setPassword] = React.useState("");

  function handleLogin() {
    if (password === "admin789") {
      setOpen(false);
      sessionStorage.setItem("open", false);
    }
  }

  React.useEffect(() => {
    let isOpen = sessionStorage.getItem("open");
    if (isOpen == "false") {
      setOpen(false);
    }
  }, []);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
         className="model"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm us that you are the right person!
          </Typography>
          <div style={{display:"flex",flexDirection:"column",gap:"30px"}}>
          <TextField
            id="outlined-controlled"
            label="Password"
            value={password}
            style={{ marginTop: "30px" }}
            type="password"
            onChange={(event) => {
                setPassword(event.target.value);
            }}
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
