import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  makeStyles,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Apartment, EventNote } from "@material-ui/icons";
import ChipAutoComplete from "components/ChipAutoComplete";
import BasicSelect from "components/FormInputs/BasicSelect";
import LabelSlider from "components/LabelSlider";
import MarathonPref from "components/MarathonPref";
import TimePick from "components/TimePick";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: "center",
  },
  tabButtonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  hr: {
    backgroundColor: "#000000",
    height: "1px",
  },
  root: {
    backgroundColor: "#EDECEC",
  },
}));

const ControlContainer = (props) => {
  const [view, setView] = useState("schedule");
  const [term, setTerm] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [eveningPref, setEveningPref] = useState(true);
  const [onlinePref, setOnlinePref] = useState(true);
  const [startPref, setStartPref] = useState("10:00 AM");
  const [consecPref, setConsecPref] = useState(2);
  const [showLimit, setShowLimit] = useState(30);

  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [room, setRoom] = useState(null);

  const handleTermChange = async (e) => {
    const value = e.target.value;
    setTerm(value);
    try {
      if (view === "schedule") {
        const data = await fetch(`${API_URL}/api/v1/courses/?term=${value}`).then((res) =>
          res.json()
        );
        const sortedCoursesAvailable = data.objects.sort((a, b) =>
          a.asString > b.asString ? 1 : b.asString > a.asString ? -1 : 0
        );
        setCoursesAvailable(sortedCoursesAvailable);
      } else if (view === "room") {
        const data = await fetch(`${API_URL}/api/v1/rooms/?term=${value}`).then((res) =>
          res.json()
        );
        const sortedRoomsAvailable = data.objects.sort((a, b) =>
          a.location > b.location ? 1 : b.location > a.location ? -1 : 0
        );
        setRoomsAvailable(sortedRoomsAvailable);
      }
    } catch (error) {
      console.log("handleTermChange", error);
    }
  };

  const handleFormSubmit = async () => {
    props.setLoading(true);

    try {
      if (view === "schedule") {
        // Set the courseId order for color parity between autocomplete chips and schedule canvas
        props.setCourseOrder(courses.map((course) => course.course));
        const course_ids = courses.map((course) => course.course).join(",");
        const eveningClassesBit = eveningPref === true ? "1" : "0";
        const onlineClassesBit = onlinePref === true ? "1" : "0";
        const prefsStr = `[${eveningClassesBit},${onlineClassesBit},${startPref},${consecPref},${showLimit}]`;
        const req_url = `${API_URL}/api/v1/gen-schedules/?term=${term}&courses=[${course_ids}]&prefs=${prefsStr}`;
        const data = await fetch(req_url).then((res) => res.json());
        props.setSchedules(data.objects.schedules);
        props.setAliases(data.objects.aliases);
        props.setErrmsg(data.objects.errmsg);
      } else if (view === "room") {
        const req_url = `${API_URL}/api/v1/room-sched/?term=${term}&room=${room}`;
        const data = await fetch(req_url).then((res) => res.json());
        props.setSchedules(data.objects.schedules);
        props.setCourseOrder(
          data.objects.schedules[0].map((courseObj) => courseObj.objects.course)
        );
        props.setAliases(data.objects.aliases);
      }
    } catch (error) {
      console.log("handleFormSubmit", error);
    } finally {
      props.setLoading(false);
    }
  };

  const handleTabButtonClick = (newView) => {
    // Ignore active view button clicks
    if (newView === view) {
      return;
    }

    props.setSchedules([]);
    props.setErrmsg("No schedules to display");

    if (newView === "room") {
      props.setShowInstructorPref(true);
      props.setRoomView(true);
    } else {
      props.setRoomView(false);
    }

    setTerm("");
    setCoursesAvailable([]);
    setCourses([]);
    setRoomsAvailable([]);
    setRoom(null);
    setView(newView);
  };

  // Format the term data for the BasicSelect component
  const termOptions = props.terms
    .sort((a, b) => (a.term > b.term ? -1 : 1))
    .map((term) => ({
      label: term.termTitle,
      value: term.term,
    }));
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.tabButtonContainer}>
          <Tooltip placement="top" title="Schedule Builder">
            <IconButton
              color={view === "schedule" ? "primary" : "default"}
              onClick={() => handleTabButtonClick("schedule")}
              size="large"
              sx={{ paddingTop: 0 }}
            >
              <EventNote fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Room Schedule">
            <IconButton
              color={view === "room" ? "primary" : "default"}
              onClick={() => handleTabButtonClick("room")}
              size="large"
              sx={{ paddingTop: 0 }}
            >
              <Apartment fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        <Stack spacing={0.5}>
          <BasicSelect
            isObj
            label="Select a term"
            onChange={handleTermChange}
            options={termOptions.sort((a, b) => (a.term > b.term ? 1 : -1))}
            value={term}
          />

          {view === "schedule" && (
            <>
              <ChipAutoComplete
                label="Enter courses"
                onChange={(_e, value) => {
                  setCourses(
                    value.sort((a, b) =>
                      a.asString > b.asString ? 1 : b.asString > a.asString ? -1 : 0
                    )
                  );
                }}
                options={coursesAvailable}
                value={courses}
              />

              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    label="Include 3-hour weekly lectures"
                    control={
                      <Checkbox
                        checked={eveningPref}
                        name="evening"
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
                        checked={onlinePref}
                        name="online"
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
                        checked={props.showInstructorPref}
                        name="instrucorNames"
                        onChange={(e) => {
                          props.setShowInstructorPref(e.target.checked);
                        }}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>

              <TimePick
                onChange={(e) => {
                  setStartPref(e.target.value);
                }}
                value={startPref}
              />

              <MarathonPref
                onChange={(e) => setConsecPref(e.target.value)}
                value={consecPref}
              />

              <div>
                <Typography gutterBottom>Max schedules to show</Typography>
                <LabelSlider
                  setShowLimit={(_e, value) => {
                    setShowLimit(value);
                  }}
                  default={30}
                  step={10}
                  min={10}
                  max={100}
                />
              </div>

              <Box className={classes.buttonContainer}>
                <Button
                  color="secondary"
                  disabled={props.loading || !Boolean(term && courses.length)}
                  onClick={handleFormSubmit}
                  variant="contained"
                >
                  Get Schedules
                </Button>
              </Box>
            </>
          )}
          {view === "room" && (
            <>
              <Autocomplete
                autoHighlight
                sx={{ width: "100%", marginTop: "-2%" }}
                onChange={(_e, value) => {
                  if (value) setRoom(value.location);
                }}
                options={roomsAvailable}
                getOptionLabel={(o) => o.location}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label={"Select a room (e.g. CCIS 1-140)"}
                  />
                )}
                noOptionsText="Select a term to see locations"
              />

              <Box className={classes.buttonContainer}>
                <Button
                  color="secondary"
                  disabled={props.loading || !Boolean(term && room)}
                  onClick={handleFormSubmit}
                  sx={{ mt: 1 }}
                  variant="contained"
                >
                  Show Timetable
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ControlContainer;
