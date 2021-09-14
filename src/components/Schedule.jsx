import { makeStyles } from "@material-ui/core";
import { createRef, useEffect, useState } from "react";

const useStyles = makeStyles({
  Media: {
    height: "auto",
    width: "auto",
    maxHeight: "90%",
    maxWidth: "90%",
  },
});

const leftMarginOffset = 148;
const topMarginOffset = 90;
const boxWidth = 200;
const boxRightMargin = 10;
const verticalLength50 = 101;
const quarterLength = verticalLength50 / 4;
const day_lookup = { U: 0, M: 1, T: 2, W: 3, R: 4, F: 5, S: 6 };
const fontSize = 20;
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
const hourPadding = 1;

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

const drawText = (x0, y0, ctx, classObj, location, boxWidth, drawInstructorText) => {
  let lines = [];
  const component = classObj.component;
  const section = classObj.section;
  const classId = classObj.class;
  let courseName = classObj.asString;
  const slicePoint = courseName.length - `${component} ${section}`.length - 1;
  lines.push(courseName.slice(0, slicePoint));
  lines.push(`${component} ${section} (${classId})`);
  location = location ? location : classObj.location;
  lines.push(location);
  if (drawInstructorText) {
    const instructorName = classObj.instructorName;
    const instructorNames = instructorName.split(" ");
    const lastName = instructorNames[instructorNames.length - 1];
    const instructorText =
      instructorNames
        .slice(0, -1)
        .map((n) => n[0] + ". ")
        .join("") + lastName;
    lines.push(instructorText.toUpperCase());
  }
  ctx.fillStyle = blackColor;
  for (let i = 0; i < lines.length; i++) {
    if (ctx.measureText(lines[i]).width > boxWidth - boxRightMargin) {
      while (ctx.measureText(`${lines[i]}...`).width > boxWidth - boxRightMargin) {
        lines[i] = lines[i].slice(0, lines[i].length - 1);
      }
      lines[i] = `${lines[i]}...`;
    }
    ctx.fillText(lines[i], x0 + 4, y0 + fontSize + i * fontSize + i * 2);
  }
};

const drawSchedule = (
  ctx,
  courseOrder,
  jsonSched,
  bp_width,
  bp_height,
  aliases,
  showInstructorPref
) => {
  let classOnWeekend = false;
  let min_y = 2147483647;
  let max_y = -2147483648;

  // Define a courseId to color mapping
  let courseColorMap = courseOrder.reduce((colorMap, courseId, i) => {
    colorMap[courseId] = colorOrder[i % colorOrder.length];
    return colorMap;
  }, {});

  for (var classObj of jsonSched) {
    classObj = classObj.objects;
    const courseId = classObj.course;
    const currColor = courseColorMap[courseId];
    let drawInstructorText =
      classObj.instructorName && !(classObj.class in aliases) ? true : false;
    if (!showInstructorPref) {
      drawInstructorText = false;
    }
    for (var ct of classObj.classtimes) {
      const biweeklyFlag = ct.biweekly;
      const classBoxWidth = biweeklyFlag === 0 ? boxWidth : boxWidth / 2;
      let start_t = startToInt(ct.startTime);
      let end_t = startToInt(ct.endTime);
      min_y = Math.min(min_y, start_t);
      max_y = Math.max(max_y, end_t);
      for (var day of ct.day) {
        if (day === "S" || day === "U") classOnWeekend = true;
        let r_x0 = leftMarginOffset + day_lookup[day] * boxWidth + day_lookup[day] * 2;
        if (biweeklyFlag === 2) {
          r_x0 += boxWidth / 2;
        }
        let r_x1 = r_x0 + classBoxWidth;
        let quartersPast = Math.floor(start_t / 15);
        let quartersFill = Math.ceil((end_t - start_t) / 15);
        let r_y0 =
          topMarginOffset + quartersPast * quarterLength + (quartersPast / 4) * 3;
        let r_y1 = r_y0 + quartersFill * quarterLength + (quartersFill / 4 - 1) * 3;
        ctx.fillStyle = blackColor;
        ctx.fillRect(r_x0 - 2, r_y0 - 2, r_x1 - r_x0 + 4, r_y1 - r_y0 + 5);
        ctx.fillStyle = currColor;
        ctx.fillRect(r_x0, r_y0, r_x1 - r_x0, r_y1 - r_y0 + 1);
        drawText(
          r_x0,
          r_y0,
          ctx,
          classObj,
          ct.location,
          classBoxWidth,
          drawInstructorText
        );
      }
    }
  }

  const topHours = Math.min(8, Math.floor(min_y / 60));
  const yRegionTop = topMarginOffset + topHours * verticalLength50 + topHours * 3;
  const bottomHours = Math.ceil(max_y / 60) + hourPadding;
  const yRegionBottom =
    topMarginOffset + bottomHours * verticalLength50 + bottomHours * 3;
  const yRegionlength = yRegionBottom - yRegionTop;
  ctx.drawImage(
    ctx.canvas,
    0,
    yRegionTop,
    bp_width,
    yRegionlength,
    0,
    topMarginOffset,
    bp_width,
    yRegionlength
  );

  let xRegionLength = bp_width;
  if (!classOnWeekend) {
    const xRegionLeft = leftMarginOffset + boxWidth + 2;
    const xRegionRight = bp_width - boxWidth - 2;
    xRegionLength = xRegionRight - xRegionLeft;
    ctx.drawImage(
      ctx.canvas,
      xRegionLeft,
      0,
      xRegionLength,
      bp_height,
      leftMarginOffset,
      0,
      xRegionLength,
      bp_height
    );
  }

  const imgData = ctx.getImageData(
    0,
    0,
    leftMarginOffset + xRegionLength,
    topMarginOffset + yRegionlength
  );
  ctx.canvas.width = leftMarginOffset + xRegionLength;
  ctx.canvas.height = topMarginOffset + yRegionlength;
  ctx.putImageData(imgData, 0, 0);
  ctx.fillStyle = blackColor;
  ctx.fillRect(
    0,
    topMarginOffset + yRegionlength - 2,
    leftMarginOffset + xRegionLength,
    2
  );
};

const Schedule = ({ courseOrder, jsonSched, aliases, showInstructorPref }) => {
  const classes = useStyles();
  const canvas = createRef(null);
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
      ctx.font = `${fontSize}px Helvetica`;
      drawSchedule(
        ctx,
        courseOrder,
        jsonSched,
        image.naturalWidth,
        image.naturalHeight,
        aliases,
        showInstructorPref
      );
    }
  }, [courseOrder, jsonSched, image, canvas, aliases, showInstructorPref]);

  return <canvas className={classes.Media} ref={canvas}></canvas>;
};

export default Schedule;
