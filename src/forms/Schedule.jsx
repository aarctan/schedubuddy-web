import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import ChipAutoComplete from "components/ChipAutoComplete";
import BasicSelect from "components/FormInputs/BasicSelect";
import MarathonPref from "components/MarathonPref";
import TimePick from "components/TimePick";
import { useFormContext } from "context/Form";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const sortObj = (objects) =>
  objects.sort((a, b) =>
    a.asString > b.asString ? 1 : b.asString > a.asString ? -1 : 0
  );

export const Form = (props) => {
  const { values, handleChange, setValues } = useFormContext();
  const [courseOptions, setCourseOptions] = useState([]);

  const handleTermChange = async (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      courses: [], // Clear courses input
    }));

    // Fetch courses on term change
    try {
      const response = await fetch(`${API_URL}/api/v1/courses/?term=${value}`);
      const data = await response.json();

      const sortedCoursesAvailable = sortObj(data.objects);
      setCourseOptions(sortedCoursesAvailable);
    } catch (error) {
      console.log(`Error fetching terms: ${error}`);
    }
  };

  const handleCourseChange = (_e, value) => {
    const sortedCourses = sortObj(value);
    setValues({ ...values, courses: sortedCourses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(values);
  };

  return (
    <Stack component="form" m={1} onSubmit={handleSubmit} spacing={0.5}>
      <Typography variant="body2">
        <div align="center">View possible schedules for a list of courses</div>
      </Typography>
      <BasicSelect
        isObj
        label="Select a term"
        name="scheduleTerm"
        onChange={handleTermChange}
        options={props.terms}
        value={values.scheduleTerm}
      />
      <ChipAutoComplete
        label="Enter courses (e.g. CMPUT 174, STAT 151, ...)"
        onChange={handleCourseChange}
        options={courseOptions}
        value={values.courses}
      />
      <FormGroup>
        <FormControlLabel
          label="Include 3-hour weekly lectures"
          control={
            <Checkbox checked={values.evening} name="evening" onChange={handleChange} />
          }
        />
      </FormGroup>
      <TimePick name="startPref" onChange={handleChange} value={values.startPref} />
      <MarathonPref name="consecPref" onChange={handleChange} value={values.consecPref} />
      <div>
        <Typography mt={1} gutterBottom>
          Max schedules to show
        </Typography>
        <Slider
          aria-label="Schedules to show"
          defaultValue={30}
          getAriaValueText={(value) => `${value} schedules`}
          marks={[
            { label: "10", value: 10 },
            { label: "30", value: 30 },
            { label: "100", value: 100 },
          ]}
          name="resultSize"
          onChange={handleChange}
          step={10}
          valueLabelDisplay="auto"
          value={values.resultSize}
        />
      </div>
      <Box sx={{ textAlign: "center" }}>
        <Button
          color="secondary"
          disabled={values.courses.length === 0}
          sx={{ mt: 1 }}
          type="submit"
          variant="contained"
        >
          Get Schedules
        </Button>
      </Box>
    </Stack>
  );
};
