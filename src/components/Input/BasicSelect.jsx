import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const BasicSelect = ({ className, isObj = false, options = [], ...rest }) => {
  const optionList = options.map((option) => {
    const [oLabel, oValue] = isObj ? [option.label, option.value] : [option, option]; // Options may be a string or object
    return (
      <MenuItem key={oValue} value={oValue}>
        {oLabel}
      </MenuItem>
    );
  });

  return (
    <FormControl className={className} fullWidth>
      {rest.label && <InputLabel>{rest.label}</InputLabel>}
      <Select {...rest}>{optionList}</Select>
    </FormControl>
  );
};

export default BasicSelect;
