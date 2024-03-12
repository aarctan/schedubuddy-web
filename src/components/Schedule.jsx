import { useEffect, useRef, useState } from "react";
import getInstructorText from "util";

const leftMarginOffset = 148;
const topMarginOffset = 90;
const boxWidth = 200;
const boxRightMargin = 10;
const verticalLength50 = 101;
const quarterLength = verticalLength50 / 4;
const day_lookup = { U: 0, M: 1, T: 2, W: 3, H: 4, R: 4, F: 5, S: 6 };
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
  // new colours
  "#99CCCC",
  "#CCFF99",
  "#9999CC",
  "#99CCCC",
  "#FFCCCC",
  "#99FFFF",
  "#FFCCFF",
  "#FFFFCC",
  "#CC99CC",
  "#CC9999",
  "#CCFFCC",
  "#99CC99",
  "#CCCC99",
  "#FF99FF",
];
const hourPadding = 0;

const startToInt = (str_t) => {
  const [time, period] = str_t.split(" ");
  const [hour, minute] = time.split(":").map((part) => parseInt(part));
  const isPM = period.toUpperCase() === "PM";
  const adjustedHour = (hour === 12 ? 0 : hour) + (isPM ? 12 : 0);
  return adjustedHour * 60 + minute;
};

const splitLineText = (ctx, text, maxWidth) => {
  const lines = [];
  const textArray = text.split(" ");
  for (let i = textArray.length; i >= 0; i--) {
    const joinedStr = textArray.slice(0, i).join(" ");
    if (ctx.measureText(joinedStr).width < maxWidth) {
      lines.push(joinedStr);
      if (i !== textArray.length)
        lines.push(textArray.slice(i, textArray.length).join(" "));
      return lines;
    }
  }
};

const drawText = (
  x0,
  y0,
  y1,
  ctx,
  classObj,
  location,
  boxWidth,
  drawInstructorText,
  halfBlock = false
) => {
  const { component, section, class: classId, asString: courseName } = classObj;
  const lines = [];
  const maxWidth = boxWidth - boxRightMargin;
  const slicePoint = courseName.lastIndexOf(`${component} ${section}`) - 1;
  location = location === "Location TBD" ? "TBD" : location || classObj.location || "TBD";
  if (!halfBlock) {
    lines.push(courseName.slice(0, slicePoint));
    lines.push(`${component} ${section} (${classId})`);
    lines.push(location);
  } else {
    const textLines = [
      courseName.slice(0, slicePoint),
      `${component} ${section}`,
      location,
    ];
    for (const textLine of textLines) {
      splitLineText(ctx, textLine, maxWidth).forEach((line) => lines.push(line));
    }
  }
  if (drawInstructorText) {
    // JSON parsing can error out, temporary fix until API response adjusted
    const instructorText = getInstructorText(classObj);
    lines.push(instructorText.toUpperCase());
  }
  ctx.fillStyle = blackColor;
  lines.forEach((line, index) => {
    if (ctx.measureText(line).width > maxWidth) {
      while (ctx.measureText(`${line}...`).width > maxWidth) {
        line = line.slice(0, -1);
      }
      line += "...";
    }
    const textYPos = y0 + fontSize + index * fontSize + index * 2;
    if (textYPos < y1) ctx.fillText(line, x0 + 4, textYPos);
  });
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
  let classOnSat = false;
  let classOnSun = false;
  let min_y = Number.MAX_SAFE_INTEGER;
  let max_y = Number.MIN_SAFE_INTEGER;

  // Define a courseId to color mapping
  const uniqueCourseOrder = [...new Set(courseOrder)];
  let courseColorMap = uniqueCourseOrder.reduce((colorMap, courseId, i) => {
    colorMap[courseId] = colorOrder[i % colorOrder.length];
    return colorMap;
  }, {});

  for (const classObj of jsonSched) {
    const classData = classObj.objects;
    const classTimes = classData.classtimes;
    const courseId = classData.course;
    const currColor = courseColorMap[courseId];
    const drawInstructorText =
      classData.instructorName && !(classData.class in aliases) && showInstructorPref;
    for (const ct of classTimes) {
      const biweeklyFlag = ct.biweekly;
      const classBoxWidth = biweeklyFlag === 0 ? boxWidth : boxWidth / 2;
      const start_t = startToInt(ct.startTime);
      const end_t = startToInt(ct.endTime);
      const quartersFill = Math.ceil((end_t - start_t) / 15);
      const quartersPast = Math.floor(start_t / 15);
      min_y = Math.min(min_y, start_t);
      max_y = Math.max(max_y, end_t);
      for (const day of ct.day) {
        if (day === "S") classOnSat = true;
        if (day === "U") classOnSun = true;

        const r_x0 =
          leftMarginOffset +
          day_lookup[day] * boxWidth +
          day_lookup[day] * 2 +
          (parseInt(biweeklyFlag) === 2 ? boxWidth / 2 : 0);
        const r_x1 = r_x0 + classBoxWidth;

        const r_y0 =
          topMarginOffset + quartersPast * quarterLength + (quartersPast / 4) * 3;
        const r_y1 = r_y0 + quartersFill * quarterLength + (quartersFill / 4 - 1) * 3;

        ctx.fillStyle = blackColor;
        ctx.fillRect(r_x0 - 2, r_y0 - 2, r_x1 - r_x0 + 4, r_y1 - r_y0 + 5);
        ctx.fillStyle = currColor;
        ctx.fillRect(r_x0, r_y0, r_x1 - r_x0, r_y1 - r_y0 + 1);

        drawText(
          r_x0,
          r_y0,
          r_y1,
          ctx,
          classData,
          ct.location,
          classBoxWidth,
          drawInstructorText,
          parseInt(biweeklyFlag) !== 0
        );
      }
    }
  }

  const minHours = Math.floor(min_y / 60);
  const maxHours = Math.ceil(max_y / 60) + hourPadding;
  const topHours = min_y === Number.MAX_SAFE_INTEGER ? 8 : Math.min(8, minHours);
  const bottomHours = max_y === Number.MIN_SAFE_INTEGER ? 15 : Math.max(17, maxHours);

  const yRegionTop = topMarginOffset + topHours * (verticalLength50 + 3);
  const yRegionBottom = topMarginOffset + bottomHours * (verticalLength50 + 3);
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

  const xRegionLeft = classOnSun ? leftMarginOffset : leftMarginOffset + boxWidth + 2;
  const xRegionRight = classOnSat ? bp_width : bp_width - boxWidth - 2;
  const xRegionLength = xRegionRight - xRegionLeft;
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

const convertCanvasToImage = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with ID "${canvasId}" not found.`);
    return null;
  }

  const dataURL = canvas.toDataURL();
  return dataURL;
};

const setupCanvas = (canvas, image, fontSize) => {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.canvas.width = image.naturalWidth;
  ctx.canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0);
  ctx.font = `${fontSize}px Helvetica`;

  return ctx;
};

const Schedule = ({ courseOrder, jsonSched, aliases, showInstructorNames }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [dataURL, setDataURL] = useState("");

  useEffect(() => {
    const schedImg = new Image();
    schedImg.src = "/boilerplate.png";
    schedImg.onload = () => setImage(schedImg);
  }, []);

  useEffect(() => {
    if (image && canvasRef.current) {
      const ctx = setupCanvas(canvasRef.current, image, fontSize);
      drawSchedule(
        ctx,
        courseOrder,
        jsonSched,
        image.naturalWidth,
        image.naturalHeight,
        aliases,
        showInstructorNames
      );
      setDataURL(convertCanvasToImage("canvas"));
    }
  }, [courseOrder, jsonSched, image, aliases, showInstructorNames]);

  return (
    <>
      <img
        src={dataURL}
        style={{
          height: "auto",
          width: "auto",
          maxHeight: "90%",
          maxWidth: "90%",
          visibility: dataURL ? "visible" : "hidden",
        }}
        alt="schedule"
      ></img>
      <canvas hidden id="canvas" ref={canvasRef}></canvas>
    </>
  );
};

export default Schedule;
