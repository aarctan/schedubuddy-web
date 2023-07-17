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
import CourseLock from "components/CourseLock";
import { useFormContext } from "context/Form";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const sortObj = (objects) =>
  objects.sort((a, b) =>
    a.asString > b.asString ? 1 : b.asString > a.asString ? -1 : 0
  );

const fetchClasses = async (term, course) => {
  const response = await fetch(
    `${API_URL}/api/v1/classes/?term=${term}&course=${course}`
  );
  const data = await response.json();
  let componentToClasses = {};

  data.objects.forEach((item) => {
    let component = item.component;
    let classId = item.class;
    let section = item.section;
    if (componentToClasses.hasOwnProperty(component)) {
      componentToClasses[component].push({ id: classId, section: section });
    } else {
      componentToClasses[component] = [{ id: classId, section: section }];
    }
  });
  return componentToClasses;
};

export const Form = (props) => {
  const { values, handleChange, setValues } = useFormContext();
  const [courseOptions, setCourseOptions] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [componentData, setComponentData] = useState({});

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
    const oldCourses = values.courses;
    const addedCourse = value.find((course) => !oldCourses.includes(course));
    const removedCourse = oldCourses.find((course) => !value.includes(course));
    const sortedCourses = sortObj(value);
    setValues({ ...values, courses: sortedCourses });
    if (addedCourse) {
      fetchClasses(values.scheduleTerm, addedCourse.asString)
        .then((data) => {
          setComponentData((prevComponentData) => ({
            ...prevComponentData,
            [addedCourse.asString]: data,
          }));
        })
        .catch((err) => console.log(`Error fetching terms: ${err}`));
    }
    if (removedCourse) {
      setComponentData((prevComponentData) => {
        const newData = { ...prevComponentData };
        delete newData[removedCourse.asString];
        return newData;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(values);
  };

  const toggleAdvancedOptions = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography textAlign="center" variant="body2">
        View possible schedules for a list of courses
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
      {showAdvanced && (
        <div>
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
          {values.courses.map((course) => (
            <CourseLock
              key={course.asString}
              term={values.scheduleTerm}
              courseName={course.asString}
              data={componentData[course.asString]}
            />
          ))}
        </div>
      )}
      <Box sx={{ textAlign: "center" }}>
        <Button onClick={toggleAdvancedOptions} sx={{ my: -1 }}>
          {showAdvanced ? "Hide advanced options" : "Expand for advanced options"}
        </Button>
      </Box>
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
