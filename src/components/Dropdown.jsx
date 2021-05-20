import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const BasicSelect = (props) => {
  const handleChange = (event) => {
    props.changedHandler(props.terms[event.target.value]);
  };

  let termList = props.terms.map((term, index) => {
    return (
      <MenuItem key={index} value={index}>
        {term.termTitle}
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Term</InputLabel>
      <Select onChange={handleChange} defaultValue="">{termList}</Select>
    </FormControl>
  );
};

export default BasicSelect;
