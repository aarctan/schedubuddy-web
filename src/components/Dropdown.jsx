import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const BasicSelect = ({ label, onChange, options, optionKey }) => {
  const handleChange = (event) => {
    onChange(options[event.target.value]);
  };

  const optionList = options.map((option, index) => {
    return (
      <MenuItem key={index} value={index}>
        {optionKey ? option[optionKey] : option}
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth>
      <InputLabel id="Courses">{label}</InputLabel>
      <Select onChange={handleChange} defaultValue="" label={label}>
        {optionList}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
