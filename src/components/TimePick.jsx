import { Grid } from "@material-ui/core";

import { FormControl, MenuItem, Select } from "@material-ui/core";

import InputLabel from "./InputLabel";

const lengthOptions = {
  0: "8 AM",
  1: "9 AM",
  2: "10 AM",
  3: "11 AM",
  4: "12 PM",
  5: "1 PM",
  6: "2 PM",
};

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

export default function TimePick({ onChange }) {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} lg={6}>
        <InputLabel label="Preferred start time" />
      </Grid>
      <Grid item xs={12} lg={4}>
        <BasicSelect onChange={onChange} options={[0, 1, 2, 3, 4, 5, 6]} />
      </Grid>
    </Grid>
  );
}
