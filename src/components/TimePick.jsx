import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Stack from "@material-ui/core/Stack";
import { Grid } from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import InputLabel from "../components/InputLabel";

export default function TimeValidationTimePicker() {
  const [value, setValue] = React.useState(new Date("2020-01-01 10:00"));

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            toolbarFormat={"helo"}
            minutesStep={15}
            renderInput={(params) => <TextField {...params} helperText={""} />}
            value={value}
            onChange={(newValue) => {
              console.log(newValue);
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <InputLabel label="Preferred start time" />
      </Grid>
    </Grid>
  );
}
