import { CardContent, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import AliasDesc from "components/AliasDesc";
import Paging from "components/Paging";
import Schedule from "components/Schedule";
import { useState } from "react";
import { styled } from "@mui/material";
import { ShareButton } from "components/ShareButton";
import { useFormContext } from "context/Form";

const rootURL = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? ":" + window.location.port : ""
}`;

export const generateShareLink = ({
  schedule,
  scheduleTerm,
  evening,
  online,
  startPref,
  consecPref,
  resultSize,
  blacklist,
}) => {
  console.log(schedule);
  const course_ids = schedule
    .map((item) => `${item.objects.course}`)
    .filter((course, index, self) => self.indexOf(course) === index)
    .join(",");

  const classes = schedule.map((item) => `${item.objects.class}`);
  const blacklist_ids = Object.keys(blacklist)
    .filter((id) => !classes.includes(id))
    .join(",");

  const eveningClassesBit = evening === true ? "1" : "0";
  const onlineClassesBit = online === true ? "1" : "0";

  return encodeURI(
    rootURL +
      "/" +
      `?term=${scheduleTerm}&courses=[${course_ids}]&evening=${eveningClassesBit}&online=${onlineClassesBit}&start=${startPref}&consec=${consecPref}&limit=${resultSize}&blacklist=[${blacklist_ids}]`
  );
};

const UnstyledScheduleContainer = ({
  className,
  courseOrder,
  schedules,
  aliases,
  errmsg,
}) => {
  const { values } = useFormContext();
  const [showInstructorNames, setShowInstructorNames] = useState(true);
  const [page, setPage] = useState(0);

  let shareLink = "";
  if (schedules.length > 0) {
     shareLink = generateShareLink({
      schedule: schedules[page],
      scheduleTerm: values.scheduleTerm,
      evening: values.evening,
      online: values.online,
      startPref: values.startPref,
      consecPref: values.consecPref,
      resultSize: values.resultSize,
      blacklist: values.blacklist,
    });
  }

  const handlePageChange = (_e, value) => {
    // onChange called with null value if elipses is clicked
    if (value !== null) {
      setPage(value - 1);
    }
  };

  const scheduleHasAliases = (schedule) => {
    for (let i = 0; i < schedule.length; i++) {
      const classObj = schedule[i];
      if (classObj.objects.class in aliases) return true;
    }
    return false;
  };

  return (
    <CardContent className={className}>
      <Grid container direction="column" className={className}>
        {schedules.length > 0 && (
          <Paging onChange={handlePageChange} pages={schedules.length} />
        )}
        {schedules.length ? (
          <Schedule
            courseOrder={courseOrder}
            jsonSched={schedules[page]}
            aliases={aliases}
            showInstructorNames={showInstructorNames}
          />
        ) : (
          <Typography variant="h5">
            <div align="center">{errmsg}</div>
          </Typography>
        )}
        {schedules.length > 0 && (
          <FormControlLabel
            label="Hide instructor names"
            control={
              <Checkbox
                name="showNames"
                onChange={(ev) => setShowInstructorNames(!ev.target.checked)}
              />
            }
          />
        )}
        {Object.keys(aliases)?.length > 0 && scheduleHasAliases(schedules[page]) && (
          <AliasDesc aliases={aliases} schedule={schedules[page]} />
        )}
        {shareLink && !errmsg && <ShareButton shareLink={shareLink} />}
      </Grid>
    </CardContent>
  );
};

const ScheduleContainer = styled(UnstyledScheduleContainer)(() => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
}));

export default ScheduleContainer;
