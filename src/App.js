import React from "react";
import { Grid } from "@material-ui/core";

import Main from "./layouts/Main";

function App() {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <Main />
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </Grid>
  );
}

export default App;
