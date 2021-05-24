import * as React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import InputLabel from "../components/InputLabel";

export default function TimeValidationTimePicker({ value, onChange }) {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            toolbarFormat={"helo"}
            minutesStep={15}
            renderInput={(params) => <TextField {...params} helperText={""} />}
            value={value}
            onChange={onChange}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <InputLabel label="Preferred start time" />
      </Grid>
    </Grid>
  );
}
