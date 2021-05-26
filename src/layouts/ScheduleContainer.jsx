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

const left_margin_offset = 148;
const top_margin_offset = 90;
const box_width = 200;
const vertical_length_50 = 101;
const day_lookup = { U: 0, M: 1, T: 2, W: 3, R: 4, F: 5, S: 6 };
const blackColor = "#000000";
const colorOrder = [
  "#FF9999",
  "#FFFF99",
  "#99FF99",
  "#99CCFF",
  "#CC99FF",
  "#FF99CC",
  "#99FFCC",
  "#FFCC99",
  "#9999FF",
  "#CCFFFF",
];

const startToInt = (str_t) => {
  let h = parseInt(str_t.slice(0, 2));
  let m = parseInt(str_t.slice(3, 5));
  let pm = str_t.slice(6, 9) === "PM" ? true : false;
  if (pm) {
    return h === 12 ? h * 60 + m : (h + 12) * 60 + m;
  } else {
    return h === 12 ? m : h * 60 + m;
  }
};

/**
                location = location if location else course_obj[2]
                draw.text((r_x0+4, r_y0+2), get_draw_text(course_obj, ct["location"]), (0,0,0), font=font)
 */

const drawSchedule = (ctx, jsonSched) => {
  let classOnWeekend = false;
  let courseItr = -1;
  let currCourse = null;
  let min_y = 2147483647;
  let max_y = -2147483648;
  for (var courseObj of jsonSched) {
    courseObj = courseObj.objects;
    let courseId = courseObj.course;
    if (courseId != currCourse) {
      currCourse = courseId;
      courseItr++;
    }
    for (var ct of courseObj.classtimes) {
      let start_t = startToInt(ct.startTime);
      let end_t = startToInt(ct.endTime);
      min_y = Math.min(min_y, start_t);
      max_y = Math.max(max_y, end_t);
      for (var day of ct.day) {
        if (day === "S" || day == "U") classOnWeekend = true;
        let r_x0 = left_margin_offset + day_lookup[day] * box_width + day_lookup[day] * 2;
        let r_x1 = r_x0 + box_width - 1;
        let quartersPast = Math.floor(start_t / 15);
        let quartersFill = Math.ceil((end_t - start_t) / 15);
        let r_y0 = top_margin_offset + quartersPast * 25.25 + (quartersPast / 4) * 3;
        let r_y1 = r_y0 + quartersFill * 25.25 + (quartersFill / 4 - 1) * 3;
        ctx.fillStyle = blackColor;
        ctx.fillRect(r_x0 - 2, r_y0 - 2, r_x1 - r_x0 + 4, r_y1 - r_y0 + 4);
        ctx.fillStyle = colorOrder[courseItr % colorOrder.length];
        ctx.fillRect(r_x0, r_y0, r_x1 - r_x0 + 1, r_y1 - r_y0 + 1);
      }
    }
  }
};

const Schedule = ({ jsonSched }) => {
  const classes = useStyles();
  const canvas = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const schedImg = new Image();
    schedImg.src = "/boilerplate.png";
    schedImg.onload = () => setImage(schedImg);
  }, []);

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      ctx.canvas.width = image.naturalWidth;
      ctx.canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);
      drawSchedule(ctx, jsonSched);
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
          {b64images.length ? (
            <Schedule jsonSched={schedules[0]} />
          ) : (
            <Typography variant="caption">
              <h2>No schedules to display</h2>
            </Typography>
          )}
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
