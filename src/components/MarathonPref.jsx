import { Grid } from "@material-ui/core";

import { FormControl, MenuItem, Select } from "@material-ui/core";

import InputLabel from "./InputLabel";

const lengthOptions = { 1: "1 hr", 2: "2 hrs", 3: "3 hrs", 4: "4 hrs", 5: "5 hrs" };

const BasicSelect = ({ options, onChange }) => {
  const optionList = options.map((option, index) => {
    return (
      <MenuItem key={index} value={index}>
        {lengthOptions[option]}
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth>
      <Select onChange={onChange} defaultValue={2}>
        {optionList}
      </Select>
    </FormControl>
  );
};

export default function MarathonPref({ onChange }) {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} lg={4}>
        <BasicSelect onChange={onChange} options={[1, 2, 3, 4, 5]} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <InputLabel label="Preferred hours of class before a break" />
      </Grid>
    </Grid>
  );
}
