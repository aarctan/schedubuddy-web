import { Autocomplete, TextField } from "@material-ui/core";

const AutocompleteInput = (props) => {
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      multiple
      id="tags-standard"
      options={props.options}
      getOptionLabel={(option) => option.termTitle}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={props.label} />
      )}
    />
  );
};

export default AutocompleteInput;
