import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

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
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {b64images.length ? (
          <img
            className={classes.Media}
            src={`data:image/png;base64,${b64images[0]}`}
            alt="Schedule"
          />
        ) : (
          <Typography variant="caption">No schedules to display</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleContainer;
