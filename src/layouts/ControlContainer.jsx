import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, makeStyles } from "@material-ui/core";

import InputLabel from "../components/InputLabel";
import Dropdown from "../components/Dropdown";
import AutocompleteInput from "../components/AutoComplete";
import Slider from "../components/Slider";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EDECEC",
  },
});

const FormGrid = ({ children, sx }) => (
  <Grid item xs={12} sx={{ my: 2, ...sx }}>
    {children}
  </Grid>
);

export default function ControlContainer(props) {
  const [term, setTerm] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [schedules, setSchedules] = useState([]);
  const [getBtnDisdabled, setGetBtnDisabled] = useState(true);

  const handleTermChange = async (term) => {
    setTerm(term);
    try {
      const data = await fetch(`${API_URL}/api/v1/courses/?term=${term.term}`).then(
        (res) => res.json()
      );
      setCoursesAvailable(data.objects);
    } catch (error) {
      console.log("handleTermChange", error);
    }
  };

  const handleCoursesChange = (_e, values) => {
    setCourses(values);
    setGetBtnDisabled(values.length === 0);
  };

  const handleFormSubmit = async () => {
    try {
      const course_ids = courses.map((course) => course.course).join(",");
      const data = await fetch(
        `${API_URL}/api/v1/gen-schedules/?term=${term.term}&courses=[${course_ids}]`
      ).then((res) => res.json());

      // setSchedules(data.objects);
      props.setB64images(data.objects.images);
    } catch (error) {
      console.log("handleFormSubmit", error);
    }
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box sx={{ mx: 2, my: 2 }}>
          <Grid justifyContent="center">
            <FormGrid>
              <Dropdown
                onChange={handleTermChange}
                options={props.terms}
                optionKey="termTitle"
              />
            </FormGrid>

            <FormGrid>
              <AutocompleteInput
                setCourses={handleCoursesChange}
                label="Add a course"
                coursesAvail={coursesAvailable}
              />
            </FormGrid>

            <FormGrid>
              <InputLabel label="Early mornings?" />
              <Slider />
            </FormGrid>

            <FormGrid>
              <InputLabel label="Evening classes?" />
              <Slider />
            </FormGrid>

            <FormGrid>
              <InputLabel label="Marathons?" />
              <Slider />
            </FormGrid>

            <FormGrid sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleFormSubmit}
                variant="contained"
                disabled={getBtnDisdabled}
              >
                Get Schedules
              </Button>
            </FormGrid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
