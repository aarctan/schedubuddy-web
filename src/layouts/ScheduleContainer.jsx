import { CardContent, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AliasDesc from "components/AliasDesc";
import Paging from "components/Paging";
import Schedule from "components/Schedule";
import { useState } from "react";

const useStyles = makeStyles({
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});

const ScheduleContainer = ({ courseOrder, schedules, aliases, errorMessage }) => {
  const classes = useStyles();
  const [showInstructorNames, setShowInstructorNames] = useState(true);
  const [page, setPage] = useState(0);

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
    <CardContent className={classes.content}>
      <Grid container direction="column" className={classes.content}>
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
            <div align="center">{errorMessage}</div>
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
      </Grid>
    </CardContent>
  );
};

export default ScheduleContainer;
