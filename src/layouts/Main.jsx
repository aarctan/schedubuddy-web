import { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";

import ControlContainer from "./ControlContainer";
import ScheduleContainer from "./ScheduleContainer";
import LoadingCard from "../components/LoadingCard";

let API_URL = process.env.REACT_APP_API_URL;

const Main = () => {
  const [terms, setTerms] = useState([]);
  const [b64images, setB64images] = useState([]);
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
    <Box mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ControlContainer
            setB64images={setB64images}
            setLoading={setLoading}
            terms={terms}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <LoadingCard />
          ) : (
            <ScheduleContainer b64images={b64images} terms={terms} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
