import { FormControl, Grid, MenuItem, Select } from "@material-ui/core";
import InputLabel from "./InputLabel";

const lengthOptions = ["1 hr", "2 hrs", "3 hrs", "4 hrs", "5 hrs"];

const BasicSelect = ({ options, ...rest }) => (
  <FormControl fullWidth>
    <Select {...rest}>
      {options.map((option, i) => (
        <MenuItem key={option} value={i + 1}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const MarathonPref = ({ onChange }) => (
  <Grid container alignItems="center" spacing={2}>
    <Grid item xs={12} lg={6}>
      <InputLabel label="Preferred hours of class before a break" />
    </Grid>
    <Grid item xs={12} lg={4}>
      <BasicSelect defaultValue={2} onChange={onChange} options={lengthOptions} />
    </Grid>
  </Grid>
);

export default MarathonPref;
