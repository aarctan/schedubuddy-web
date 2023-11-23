import React, { useState } from "react";
import { FormGroup, FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Box, Chip } from "@mui/material";
import { useFormContext } from "context/Form";
import Tooltip from "@mui/material/Tooltip";
import getInstructorText from "util";

const CourseLock = (props) => {
  const { values, setValues } = useFormContext();
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = (event) => {
    setIsEnabled(event.target.checked);

    if (!event.target.checked) {
      setValues((prevValues) => {
        const updatedBlacklist = { ...prevValues.blacklist };
        Object.keys(props.data).forEach((componentName) => {
          props.data[componentName].forEach((classData) => {
            updatedBlacklist[classData.id] = false;
          });
        });

        return { ...prevValues, blacklist: updatedBlacklist };
      });
    }
  };

  const handleChipClick = (classId) => {
    setValues((prevValues) => ({
      ...prevValues,
      blacklist: {
        ...prevValues.blacklist,
        [classId]: !prevValues.blacklist[classId],
      },
    }));
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={isEnabled} onChange={handleToggle} name={props.courseName} />
        }
        label={`Filter ${props.courseName}`}
      />
      {isEnabled &&
        Object.keys(props.data).map((componentName) => (
          <React.Fragment key={componentName}>
            <Typography
              sx={{
                display: "flex",
              }}
            >
              {`${componentName}`}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {props.data[componentName].map((classData) => {
                const tooltipText = `${classData.component} ${classData.section} (${classData.id})`;
                const instructorText = getInstructorText(classData);
                return (
                  <Tooltip
                    title={
                      <div>
                        {tooltipText}
                        <br />
                        {instructorText}
                      </div>
                    }
                    placement="top"
                    leaveDelay={0}
                    disableInteractive
                    key={classData.id}
                  >
                    <Chip
                      variant="outlined"
                      label={classData.section}
                      onClick={() => handleChipClick(classData.id)}
                      sx={{
                        backgroundColor: values.blacklist[classData.id]
                          ? "#D3D3D3"
                          : "#FEDB04",
                        my: 0.25,
                        mx: 0.1,
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </React.Fragment>
        ))}
    </FormGroup>
  );
};

export default CourseLock;
