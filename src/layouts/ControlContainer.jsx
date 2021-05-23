import { useState } from "react";
import { Button, Card, CardContent, Grid, makeStyles, Divider } from "@material-ui/core";

import InputLabel from "../components/InputLabel";
import Dropdown from "../components/Dropdown";
import AutocompleteInput from "../components/AutoComplete";
import Slider from "../components/Slider";
import LabelSlider from "../components/LabelSlider";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EDECEC",
  },
  hr: {
    backgroundColor: "#000000",
    height: "1px",
  },
});

const FormGrid = ({ children, sx }) => (
  <Grid item xs={12} sx={{ my: 1, ...sx }}>
    {children}
  </Grid>
);

const ControlContainer = (props) => {
  const [term, setTerm] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showLimit, setShowLimit] = useState(30);
  // const [schedules, setSchedules] = useState([]);

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
  };

  const handleFormSubmit = async () => {
    props.setLoading(true);
    try {
      console.log(showLimit);
      const course_ids = courses.map((course) => course.course).join(",");
      const data = await fetch(
        `${API_URL}/api/v1/gen-schedules/?term=${term.term}&courses=[${course_ids}]&limit=${showLimit}`
      ).then((res) => res.json());

      // setSchedules(data.objects);
      props.setB64images(data.objects.images);
    } catch (error) {
      console.log("handleFormSubmit", error);
    } finally {
      props.setLoading(false);
    }
  };

  const handleShowLimitChange = (_e, value) => {
    setShowLimit(value);
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent sx={{ mx: 1, my: 0 }}>
        <Grid container justifyContent="center">
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
            <Slider default={1} step={1} min={0} max={2} />
          </FormGrid>

          <FormGrid>
            <InputLabel label="Evening classes?" />
            <Slider default={1} step={1} min={0} max={1} />
          </FormGrid>

          <FormGrid>
            <InputLabel label="Marathons?" />
            <Slider default={1} step={1} min={0} max={2} />
          </FormGrid>

          <FormGrid>
            <InputLabel label="Max schedules to show:" />
            <LabelSlider
              setShowLimit={handleShowLimitChange}
              default={30}
              step={10}
              min={10}
              max={100}
            />
          </FormGrid>

          <FormGrid sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleFormSubmit}
              variant="contained"
              disabled={props.loading || !Boolean(term && courses.length)}
            >
              Get Schedules
            </Button>
          </FormGrid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ControlContainer;
