import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BasicSelect from "components/FormInputs/BasicSelect";
import TimePick from "components/TimePick";
import { useFormContext } from "context/Form";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const dayOptions = [
  { label: "Sunday", value: "U" },
  { label: "Monday", value: "M" },
  { label: "Tuesday", value: "T" },
  { label: "Wednesday", value: "W" },
  { label: "Thursday", value: "H" },
  { label: "Friday", value: "F" },
  { label: "Saturday", value: "S" },
];

const timeOptions = [
  { label: "8 AM", value: "8:00 AM" },
  { label: "9 AM", value: "9:00 AM" },
  { label: "10 AM", value: "10:00 AM" },
  { label: "11 AM", value: "11:00 AM" },
  { label: "12 PM", value: "12:00 PM" },
  { label: "1 PM", value: "1:00 PM" },
  { label: "2 PM", value: "2:00 PM" },
  { label: "3 PM", value: "3:00 PM" },
  { label: "4 PM", value: "4:00 PM" },
  { label: "5 PM", value: "5:00 PM" },
  { label: "6 PM", value: "6:00 PM" },
];

export const Form = (props) => {
  const { values, handleChange } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.onSubmit(values);
    console.log(values);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography textAlign="center" variant="body2">
        View free classes during given timeframe
      </Typography>
      <BasicSelect
        isObj
        label="Select a term"
        name="freeRoomTerm"
        onChange={handleChange}
        options={props.terms}
        value={values.freeRoomTerm}
      />
      <BasicSelect
        isObj
        label="Select a day"
        name="freeRoomDay"
        onChange={handleChange}
        options={dayOptions}
        value={values.freeRoomDay}
      />
      <BasicSelect
        isObj
        label="Select a start time"
        name="freeRoomStartTime"
        onChange={handleChange}
        options={timeOptions}
        value={values.freeRoomStartTime}
      />
      <BasicSelect
        isObj
        label="Select an end time"
        name="freeRoomEndTime"
        onChange={handleChange}
        options={timeOptions}
        value={values.freeRoomEndTime}
      />
      <Box sx={{ textAlign: "center" }}>
        <Button
          color="secondary"
          disabled={
            values.freeRoomTerm === "" ||
            values.freeRoomDay == "" ||
            values.freeRoomStartTime == "" ||
            values.freeRoomEndTime == ""
          }
          type="submit"
          variant="contained"
        >
          Show Free Rooms
        </Button>
      </Box>
    </Stack>
  );
};
