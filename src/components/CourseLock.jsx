import React, { useState } from "react";
import { FormGroup, FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Box, Chip } from "@mui/material";

const CourseLock = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [blacklistedClasses, setBlacklistedClasses] = useState({});

  const handleChange = (event) => {
    setIsEnabled(event.target.checked);
  };

  const handleChipClick = (classId) => {
    setBlacklistedClasses((prevSelected) => ({
      ...prevSelected,
      [classId]: !prevSelected[classId],
    }));
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={isEnabled}
            onChange={handleChange}
            name={props.courseName}
            sx={{ my: -1 }}
          />
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
              {`${props.courseName} ${componentName}`}
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
                return (
                  <Chip
                    variant="outlined"
                    key={classData.id}
                    label={classData.section}
                    onClick={() => handleChipClick(classData.id)}
                    sx={{
                      backgroundColor: blacklistedClasses[classData.id]
                        ? "#D3D3D3"
                        : "#FEDB04",
                      my: 0.5,
                      mx: 0.1,
                      //fontWeight: "bold",
                    }}
                  />
                );
              })}
            </Box>
          </React.Fragment>
        ))}
    </FormGroup>
  );
};

export default CourseLock;
