import InputLabel from "@material-ui/core/InputLabel";
import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const BasicSelect = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let termList = props.terms.map((term)=>{
    return <MenuItem value={term.termTitle}>{term.termTitle}</MenuItem>
  })

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
        {termList}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
