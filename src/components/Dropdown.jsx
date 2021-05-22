import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const BasicSelect = ({ onChange, options, optionKey }) => {
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
      <InputLabel id="Courses">Select a term</InputLabel>
      <Select onChange={handleChange} defaultValue="" label="select-label">
        {optionList}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
