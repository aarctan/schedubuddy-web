import { Autocomplete, Chip, TextField } from "@mui/material";
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

const ChipAutoComplete = (props) => {
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
      open={
        props.term === "1870" || props.term === "1880"
          ? input.length > 0
          : input.length > 1
      }
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
            sx={{ backgroundColor: colorOrder[index % colorOrder.length] }}
            label={`${option.asString}`}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => <TextField {...params} label={props.label} />}
      noOptionsText={"No courses found"}
      value={props.value}
    />
  );
};

export default ChipAutoComplete;
