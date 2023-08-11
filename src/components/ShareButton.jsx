import { Button, Snackbar } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import MuiAlert from "@mui/material/Alert";
import React from "react";

export const ShareButton = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const copyShareLink = () => {
    navigator.clipboard
      .writeText(props.shareLink)
      .then(() => {
        console.log("Link copied to clipboard");
        setOpen(true); // Show popup
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    props.shareLink && (
      <>
        <Button
          onClick={copyShareLink}
          color="secondary"
          sx={{ mt: 1, textAlign: "center" }}
          type="button"
          variant="contained"
        >
          <IosShareIcon sx={{ mr: 1 }} /> Save Schedule
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "middle" }}
        >
          <MuiAlert
            onClose={handleClose}
            severity="success"
            elevation={6}
            variant="standard"
          >
            Link copied to clipboard!
          </MuiAlert>
        </Snackbar>
      </>
    )
  );
};
