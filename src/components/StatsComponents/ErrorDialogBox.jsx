import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ dialog, messages, setDialog }) {
  const handleClose = () => {
    setDialog(false);
  };

  return (
    <div>
      <Dialog
        open={dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Error Messages"}</DialogTitle>
        <DialogContent>
          {messages?.map((message, index) => {
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                <p>{index + 1}.</p>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{ marginBottom: "15px" }}
                >
                  {message}
                </DialogContentText>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}
