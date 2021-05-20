import InputLabel from "@material-ui/core/InputLabel";
import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

const BasicSelect = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Term</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>option1</MenuItem>
        <MenuItem value={20}>option2</MenuItem>
        <MenuItem value={30}>option3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
