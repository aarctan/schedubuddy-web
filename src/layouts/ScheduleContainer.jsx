import { useState, useEffect, useRef } from "react";
import { Grid, Card, CardContent, makeStyles, Typography } from "@material-ui/core";

import Paging from "../components/Paging";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    backgroundColor: "#EDECEC",
    display: "flex",
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

const Schedule = ({ jsonSched }) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const schedImg = new Image();
    schedImg.src = "/boilerplate.png";
    schedImg.onload = () => setImage(schedImg);
    console.log(schedImg);
  }, []);

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      ctx.canvas.width = image.naturalWidth;
      ctx.canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);
    }
  }, [image, canvas]);

  return <canvas className={classes.Media} ref={canvas}></canvas>;
};

const ScheduleContainer = ({ schedules, b64images }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="column" className={classes.content}>
          <Schedule jsonSched={schedules[page]} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleContainer;

/**
 * return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="column" className={classes.content}>
          {b64images.length > 0 && (
            <Paging onChange={handlePageChange} pages={b64images.length} />
          )}
          {b64images.length ? (
            <img
              className={classes.Media}
              src={`data:image/png;base64,${b64images[page]}`}
              alt="Schedule"
            />
          ) : (
            <Typography variant="caption"><h2>No schedules to display</h2></Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  ); */

/**
   * 
   * <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container direction="column" className={classes.content}>
          <Schedule jsonSched={schedules[page]} />
        </Grid>
      </CardContent>
    </Card>
   */
