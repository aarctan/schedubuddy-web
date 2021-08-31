import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
} from "@material-ui/core";

import InputLabel from "../components/InputLabel";
import AutocompleteInput from "../components/AutoComplete";
import LabelSlider from "../components/LabelSlider";
import TimePick from "../components/TimePick";
import MarathonPref from "../components/MarathonPref";
import BasicSelect from "../components/Input/BasicSelect";

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
  <Grid item xs={12} sx={{ my: 0.5, ...sx }}>
    {children}
  </Grid>
);

const ControlContainer = (props) => {
  const [term, setTerm] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [eveningPref, setEveningPref] = useState(true);
  const [onlinePref, setOnlinePref] = useState(true);
  const [startPref, setStartPref] = useState("10:00 AM");
  const [consecPref, setConsecPref] = useState(2);
  const [showLimit, setShowLimit] = useState(30);

  const handleTermChange = async (e) => {
    const value = e.target.value;
    setTerm(value);
    try {
      const data = await fetch(`${API_URL}/api/v1/courses/?term=${value}`).then((res) =>
        res.json()
      );
      const sortedCoursesAvailable = data.objects.sort((a, b) =>
        a.asString > b.asString ? 1 : b.asString > a.asString ? -1 : 0
      );
      setCoursesAvailable(sortedCoursesAvailable);
    } catch (error) {
      console.log("handleTermChange", error);
    }
  };

  const handleFormSubmit = async () => {
    // Set the courseId order for color parity between autocomplete chips and schedule canvas
    props.setCourseOrder(courses.map((course) => course.course));

    props.setLoading(true);
    try {
      const course_ids = courses.map((course) => course.course).join(",");
      const eveningClassesBit = eveningPref === true ? "1" : "0";
      const onlineClassesBit = onlinePref === true ? "1" : "0";
      const prefsStr = `[${eveningClassesBit},${onlineClassesBit},${startPref},${consecPref},${showLimit}]`;
      const req_url = `${API_URL}/api/v1/gen-schedules/?term=${term}&courses=[${course_ids}]&prefs=${prefsStr}`;
      const data = await fetch(req_url).then((res) => res.json());
      props.setSchedules(data.objects.schedules);
      props.setAliases(data.objects.aliases);
      props.setErrmsg(data.objects.errmsg);
    } catch (error) {
      console.log("handleFormSubmit", error);
    } finally {
      props.setLoading(false);
    }
  };

  // Format the term data for the BasicSelect component
  const termOptions = props.terms.map((term) => ({
    label: term.termTitle,
    value: term.term,
  }));
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent sx={{ mx: 1 }}>
        <Grid container justifyContent="center">
          <FormGrid>
            <BasicSelect
              isObj
              label="Select a term"
              onChange={handleTermChange}
              options={termOptions}
              value={term}
            />
          </FormGrid>

          <FormGrid>
            <AutocompleteInput
              label="Enter courses"
              onChange={(_e, value) => {
                setCourses(value);
              }}
              options={coursesAvailable}
            />
          </FormGrid>

          <FormGrid>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  label="Include 3-hour weekly lectures"
                  control={
                    <Checkbox
                      name="evening"
                      checked={eveningPref}
                      onChange={(e) => {
                        setEveningPref(e.target.checked);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Include online classes"
                  control={
                    <Checkbox
                      name="online"
                      checked={onlinePref}
                      onChange={(e) => {
                        setOnlinePref(e.target.checked);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Show instructor names"
                  control={
                    <Checkbox
                      name="instrucorNames"
                      checked={props.showInstructorPref}
                      onChange={(e) => {
                        props.setShowInstructorPref(e.target.checked);
                      }}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </FormGrid>

          <FormGrid>
            <TimePick
              onChange={(e) => {
                setStartPref(e.target.value);
              }}
              value={startPref}
            />
          </FormGrid>

          <FormGrid>
            <MarathonPref
              onChange={(e) => setConsecPref(e.target.value)}
              value={consecPref}
            />
          </FormGrid>

          <FormGrid>
            <InputLabel label="Max schedules to show:" />
            <LabelSlider
              setShowLimit={(_e, value) => {
                setShowLimit(value);
              }}
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
              color="secondary"
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
