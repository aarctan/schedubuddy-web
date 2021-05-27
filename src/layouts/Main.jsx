import { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";

import ControlContainer from "./ControlContainer";
import ScheduleContainer from "./ScheduleContainer";
import LoadingCard from "../components/LoadingCard";
import UnderConstruction from "./UnderConstruction";

let API_URL = process.env.REACT_APP_API_URL;

const Main = () => {
  const [terms, setTerms] = useState([]);
  const [schedules, setSchedules] = useState([]);
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
    <Box mt={10}>
      <UnderConstruction />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ControlContainer
            setSchedules={setSchedules}
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
              schedules={schedules}
              errmsg={errmsg}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
