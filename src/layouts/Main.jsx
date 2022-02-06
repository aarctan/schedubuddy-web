import { Box, Grid } from "@material-ui/core";
import ControlContainer from "./ControlContainer";
import ScheduleContainer from "./ScheduleContainer";
import LoadingCard from "../components/LoadingCard";
import UnderConstruction from "./UnderConstruction";
import { useEffect, useState } from "react";

let API_URL = process.env.REACT_APP_API_URL;

const Main = () => {
  const [courseOrder, setCourseOrder] = useState([]);
  const [terms, setTerms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [aliases, setAliases] = useState([]);
  const [showInstructorPref, setShowInstructorPref] = useState(false);
  const [errmsg, setErrmsg] = useState("No schedules to display");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/terms`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTerms(data.objects);
      })
      .catch((error) => console.log("Main useEffect", error));
  }, []);

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ControlContainer
            setCourseOrder={setCourseOrder}
            setSchedules={setSchedules}
            setAliases={setAliases}
            showInstructorPref={showInstructorPref}
            setShowInstructorPref={setShowInstructorPref}
            setLoading={setLoading}
            setErrmsg={setErrmsg}
            loading={loading}
            terms={terms}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <LoadingCard />
          ) : (
            <ScheduleContainer
              courseOrder={courseOrder}
              schedules={schedules}
              aliases={aliases}
              showInstructorPref={showInstructorPref}
              errmsg={errmsg}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
