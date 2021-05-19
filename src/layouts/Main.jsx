import { Box, Grid } from "@material-ui/core";
import AutocompleteInput from "../components/AutoComplete";
import Slider from "../components/Slider";

const FormGrid = ({ children }) => (
  <Grid item xs={12} md={5} sx={{ my: 2 }}>
    {children}
  </Grid>
);

const Main = () => {
  return (
    <Box sx={{ mx: 4, my: 8 }}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <FormGrid>
          <AutocompleteInput />
        </FormGrid>
        <FormGrid>
          <Slider />
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default Main;
