import { useState } from "react";
import { Grid, Card, CardContent, makeStyles, Typography } from "@material-ui/core";

import Paging from "../components/Paging";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    backgroundColor: "#EDECEC",
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  Media: {
    height: "auto",
    width: "auto",
    maxHeight: "90%",
    maxWidth: "90%",
  },
});

const ScheduleContainer = ({ b64images }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value-1);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="column" className={classes.content}>
          {b64images.length && (
            <Paging onChange={handlePageChange} pages={b64images.length} />
          )}
          {b64images.length ? (
            <img
              className={classes.Media}
              src={`data:image/png;base64,${b64images[page]}`}
              alt="Schedule"
            />
          ) : (
            <Typography variant="caption">No schedules to display</Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleContainer;
