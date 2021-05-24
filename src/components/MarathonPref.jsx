import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Stack from "@material-ui/core/Stack";
import { Grid } from "@material-ui/core";

import { FormControl, MenuItem, Select } from "@material-ui/core";


import InputLabel from "./InputLabel";

const lengthOptions = { 1: "1 hr", 2: "2 hrs", 3: "3 hrs", 4: "4 hrs", 5: "5 hrs" };

const BasicSelect = ({ options }) => {
  const optionList = options.map((option, index) => {
    return (
      <MenuItem key={index} value={index}>
        {lengthOptions[option]}
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth>
      <Select defaultValue={2}>{optionList}</Select>
    </FormControl>
  );
};

export default function MarathonPref() {
  const [value, setValue] = React.useState(new Date("2020-01-01 10:00"));

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} lg={4}>
        <BasicSelect options={[1, 2, 3, 4, 5]} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <InputLabel label="Preferred hours of class before a break" />
      </Grid>
    </Grid>
  );
}
