import { Button, Snackbar } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useFormContext } from "context/Form";
import { fetchClasses } from "forms/Schedule";

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
}) => {
  const course_ids = schedule
    .map((item) => `${item.objects.course}`)
    .filter((course, index, self) => self.indexOf(course) === index)
    .join(",");

  const classes = schedule.map((item) => `${item.objects.class}`);
  console.log(schedule);

  let courses = {
    LEC: [],
    LAB: [],
  };
  for (let i = 0; i < schedule.length; i++) {
    const fetchedClasses = await fetchClasses(scheduleTerm, schedule[i].objects.class);
    courses.LEC.push(...fetchedClasses.LEC);
    courses.LAB.push(...fetchedClasses.LAB);
  }

  // Extract all section IDs from provided data
  const allSectionIds = [
    ...courses.LEC.map((lec) => lec.id),
    ...courses.LAB.map((lab) => lab.id),
  ];

  // Blacklist is all section IDs minus the classes in the schedule
  const blacklist_ids = allSectionIds.filter((id) => !classes.includes(id)).join(",");

  console.log(schedule);

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

  const copyShareLink = () => {
    const shareLink = generateShareLink({
      schedule: props.schedule,
      scheduleTerm: values.scheduleTerm,
      evening: values.evening,
      online: values.online,
      startPref: values.startPref,
      consecPref: values.consecPref,
      resultSize: values.resultSize,
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

  if (props.schedule) {
    return (
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
