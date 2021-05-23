import { Chip, Autocomplete, TextField } from "@material-ui/core";

const colorOrder = [
  "#FF9999",
  "#FFFF99",
  "#99FF99",
  "#99CCFF",
  "#CC99FF",
  "#FF99CC",
  "#99FFCC",
  "#FFCC99",
  "#9999FF",
  "#CCFFFF",
];

const AutocompleteInput = (props) => (
  <Autocomplete
    sx={{ width: "100%", marginTop: "-5%" }}
    disableClearable={true}
    multiple
    id="courses-outlined"
    onChange={props.setCourses}
    options={props.coursesAvail}
    getOptionLabel={(o) => o.asString}
    renderTags={(value, getTagProps) =>
      value.map((option, index) => (
        <Chip
          variant="outlined"
          style={{ backgroundColor: colorOrder[index % colorOrder.length] }}
          label={`${option.asString}`}
          {...getTagProps({ index })}
        />
      ))
    }
    renderInput={(params) => (
      <TextField
        {...params}
        variant="standard"
        placeholder={props.label}
        margin="normal"
      />
    )}
  />
);

export default AutocompleteInput;
