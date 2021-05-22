import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Box, Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import InputLabel from "../components/InputLabel";
import Dropdown from "../components/Dropdown";
import AutocompleteInput from "../components/AutoComplete";
import Slider from "../components/Slider";

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
  const [schedules, setSchedules] = useState([]);
  const [getBtnDisdabled, setGetBtnDisabled] = useState(true);

  const handleTermChange = (term) => {
    setTerm(term);
    fetch(`${props.root_url}/api/v1/courses/?term=${term.term}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCoursesAvailable(data.objects);
      });
  };

  const handleCoursesChange = (event, values) => {
    setCourses(values);
    setGetBtnDisabled(values.length == 0 ? true : false);
  };

  const handleFormSubmit = () => {
    const course_ids = courses.map((course) => course.course).join(",");
    fetch(
      `${props.root_url}/api/v1/gen-schedules/?term=${term.term}&courses=[${course_ids}]`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSchedules(data.objects);
        props.setB64images(data.objects.images);
      });
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

      <CardActions></CardActions>
    </Card>
  );
}
