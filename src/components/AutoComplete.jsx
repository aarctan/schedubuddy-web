import {
  Autocomplete,
  TextField,
  Typography,
  FormLabel,
} from "@material-ui/core";

const AutocompleteInput = (props) => {
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      multiple
      id="courses-outlined"
      options={props.options}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

export default AutocompleteInput;
