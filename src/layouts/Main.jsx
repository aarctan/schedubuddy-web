import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import AutocompleteInput from "../components/AutoComplete";
import Slider from "../components/Slider";
import Dropdown from "../components/Dropdown";
import InputLabel from "../components/InputLabel";

const testOptions = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

const FormGrid = ({ children, sx }) => (
  <Grid item xs={12} md={5} sx={{ my: 2, ...sx }}>
    {children}
  </Grid>
);

const Main = (props) => {
  const [courses, setCourses] = useState(testOptions);
  return (
    <Box sx={{ mx: 4, my: 8 }}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <FormGrid>
          <InputLabel label="Select a term" />
          <Dropdown terms={props.terms} />
        </FormGrid>

        <FormGrid>
          <InputLabel label="Add courses" />
          <AutocompleteInput label="Courses" options={courses} />
        </FormGrid>

        <FormGrid>
          <InputLabel label="Morning class preference" />
          <Slider />
        </FormGrid>
        <FormGrid>
          <InputLabel label="Marathon preference" />
          <Slider />
        </FormGrid>
        <FormGrid sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained">Find Schedules</Button>
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default Main;
