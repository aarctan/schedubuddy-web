import { Grid } from "@material-ui/core";

const FormGrid = ({ children }) => (
  <Grid item xs={12} md={5} sx={{ my: 2 }}>
    {children}
  </Grid>
);

export default FormGrid;
