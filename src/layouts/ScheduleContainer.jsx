import {
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import AliasDesc from "components/AliasDesc";
import Paging from "components/Paging";
import Schedule from "components/Schedule";
import { ShareButton } from "components/ShareButton";
import { useState } from "react";

const MiniFormControlLabel = styled(FormControlLabel)({
  // Custom styles here
  "& .MuiTypography-root": {
    fontSize: "0.8rem",
  },
});

const UnstyledScheduleContainer = ({
  className,
  courseOrder,
  term,
  schedules,
  aliases,
  errmsg,
  componentData,
}) => {
  const [showInstructorNames, setShowInstructorNames] = useState(true);
  const [page, setPage] = useState(0);

  const handlePageChange = (_e, value) => {
    // onChange called with null value if ellipses is clicked
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
            term={term}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <MiniFormControlLabel
              label="Hide instructor"
              control={
                <Checkbox
                  name="showNames"
                  size="small"
                  onChange={(ev) => setShowInstructorNames(!ev.target.checked)}
                />
              }
            />
            <ShareButton schedule={schedules[page]} componentData={componentData} />
          </Box>
        )}
        {Object.keys(aliases)?.length > 0 && scheduleHasAliases(schedules[page]) && (
          <AliasDesc aliases={aliases} schedule={schedules[page]} />
        )}
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
