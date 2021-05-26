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
import Dropdown from "../components/Dropdown";
import AutocompleteInput from "../components/AutoComplete";
import LabelSlider from "../components/LabelSlider";
import TimePick from "../components/TimePick";
import MarathonPref from "../components/MarathonPref";

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
  const [onlinePref, setOnlinePref] = useState(false);
  const [startPref, setStartPref] = useState(new Date("2020-01-01 10:00"));
  const [consecPref, setConsecPref] = useState(2);
  const [showLimit, setShowLimit] = useState(30);

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

  const handleFormSubmit = async () => {
    props.setLoading(true);
    try {
      const course_ids = courses.map((course) => course.course).join(",");
      const eveningClassesBit = eveningPref === true ? "1" : "0";
      const onlineClassesBit = onlinePref === true ? "1" : "0";
      const startTimeStr = startPref.toLocaleTimeString().replace(/:\d+ /, " ");
      const consecHoursStr = consecPref.toString();
      const showLimitStr = showLimit.toString();
      const prefsStr = `[${eveningClassesBit},${onlineClassesBit},${startTimeStr},${consecHoursStr},${showLimitStr}]`;
      const req_url = `${API_URL}/api/v1/gen-schedules/?term=${term.term}&courses=[${course_ids}]&prefs=${prefsStr}`;
      const data = await fetch(req_url).then((res) => res.json());
      props.setB64images(data.objects.images);
      props.setSchedules(data.objects.schedules);
      console.log(data.objects.schedules);
    } catch (error) {
      console.log("handleFormSubmit", error);
    } finally {
      props.setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent sx={{ mx: 1 }}>
        <Grid container justifyContent="center">
          <FormGrid>
            <Dropdown
              label="Select a term"
              onChange={handleTermChange}
              options={props.terms}
              optionKey="termTitle"
            />
          </FormGrid>

          <FormGrid>
            <AutocompleteInput
              courses={courses}
              coursesAvail={coursesAvailable}
              label="Enter courses"
              setCourses={(_e, value) => {
                setCourses(value);
              }}
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
              </FormGroup>
            </FormControl>
          </FormGrid>

          <FormGrid>
            <TimePick
              value={startPref}
              onChange={(value) => {
                setStartPref(value);
              }}
            />
          </FormGrid>

          <FormGrid>
            <MarathonPref
              onChange={(_e, value) => {
                setConsecPref(value["props"]["value"] + 1);
              }}
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
