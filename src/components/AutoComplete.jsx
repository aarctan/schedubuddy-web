import {
  Autocomplete,
  TextField,
} from "@material-ui/core";

const AutocompleteInput = (props) => {

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      multiple
      id="courses-outlined"
      onChange={props.setCourses}
      options={props.coursesAvail}
      getOptionLabel={(option) => option.asString}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

export default AutocompleteInput;
