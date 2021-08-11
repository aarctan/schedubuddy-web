import { useState } from "react";
import { Chip, Autocomplete, TextField } from "@material-ui/core";

const AutocompleteInput = (props) => {
  const [input, setInput] = useState("");

  const handleInput = (_e, newInputValue) => {
    setInput(newInputValue);
  };

  return (
    <Autocomplete
      freeSolo
      sx={{ width: "100%", marginTop: "-2%" }}
      disableClearable={true}
      multiple
      open={input.length > 1}
      id="courses-outlined"
      inputValue={input}
      onInputChange={handleInput}
      onChange={props.setCourses}
      options={props.coursesAvail}
      getOptionLabel={(o) => o.asString}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            style={{ backgroundColor: "#dbdbdb" }}
            label={`${option.asString}`}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} margin="normal" label={props.label} />
      )}
    />
  );
};

export default AutocompleteInput;
