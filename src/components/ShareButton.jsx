import ShareIcon from "@mui/icons-material/Share";
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useFormContext } from "context/Form";
import React from "react";

const rootURL = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? ":" + window.location.port : ""
}`;

export const generateShareLink = async ({
  schedule,
  scheduleTerm,
  evening,
  online,
  startPref,
  consecPref,
  resultSize,
  componentData,
}) => {
  const course_ids = schedule
    .map((item) => `${item.objects.course}`)
    .filter((course, index, self) => self.indexOf(course) === index)
    .join(",");

  const classes = schedule.map((item) => `${item.objects.class}`);

  // Extract all section IDs from componentData
  const allClasses = Object.values(componentData).flatMap((course) =>
    Object.values(course).flatMap((component) => component.map((section) => section.id))
  );

  // Blacklist is all section IDs minus the classes in the schedule
  const blacklist_ids = allClasses.filter((id) => !classes.includes(id)).join(",");
  const eveningClassesBit = evening === true ? "1" : "0";
  const onlineClassesBit = online === true ? "1" : "0";

  return encodeURI(
    rootURL +
      "/" +
      `?term=${scheduleTerm}&courses=[${course_ids}]&evening=${eveningClassesBit}&online=${onlineClassesBit}&start=${startPref}&consec=${consecPref}&limit=${resultSize}&blacklist=[${blacklist_ids}]`
  );
};

export const ShareButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const { values } = useFormContext();
  const handleClose = () => {
    setOpen(false);
  };

  const copyShareLink = async () => {
    const shareLink = await generateShareLink({
      schedule: props.schedule,
      scheduleTerm: values.scheduleTerm,
      evening: values.evening,
      online: values.online,
      startPref: values.startPref,
      consecPref: values.consecPref,
      resultSize: values.resultSize,
      componentData: props.componentData,
    });

    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        console.log("Link copied to clipboard");
        setOpen(true); // Show popup
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  if (props.schedule && props.componentData) {
    return (
      <>
        <Button
          onClick={copyShareLink}
          size="small"
          sx={{
            textAlign: "center",
            fontSize: "0.75rem",
          }}
          type="button"
          variant="text"
          startIcon={<ShareIcon />}
        >
          Share
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
    );
  } else {
    return null;
  }
};
