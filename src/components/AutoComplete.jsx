import { Autocomplete, Chip, TextField } from "@material-ui/core";
import { useState } from "react";

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

const AutocompleteInput = (props) => {
  const [input, setInput] = useState("");

  const handleInput = (_e, newInputValue) => {
    setInput(newInputValue);
  };

  return (
    <Autocomplete
      autoHighlight
      sx={{ width: "100%", marginTop: "-2%" }}
      disableClearable={true}
      multiple
      open={input.length > 1}
      id="courses-outlined"
      inputValue={input}
      onInputChange={handleInput}
      onChange={props.onChange}
      options={props.options}
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
        <TextField {...params} margin="normal" label={props.label} />
      )}
      noOptionsText={"No courses found"}
      value={props.value}
    />
  );
};

export default AutocompleteInput;
