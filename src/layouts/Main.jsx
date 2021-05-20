import { Box, Grid } from "@material-ui/core";
import AutocompleteInput from "../components/AutoComplete";
import Slider from "../components/Slider";

const FormGrid = ({ children }) => (
  <Grid item xs={12} md={5} sx={{ my: 2 }}>
    {children}
  </Grid>
);

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

const Main = (props) => {
  return (
    <Box sx={{ mx: 4, my: 8 }}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <FormGrid>
          <AutocompleteInput
            label={"Select academic term"}
            options={props.terms}
          />
          <AutocompleteInput label={"Add a course"} options={top100Films} />
        </FormGrid>
        <FormGrid>
          <Slider />
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default Main;
