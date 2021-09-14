import { Grid, Slider, Typography } from "@material-ui/core";

const DiscreteSlider = (props) => (
  <Grid container spacing={2}>
    <Grid item>
      <Typography>No</Typography>
    </Grid>
    <Grid item xs>
      <Slider
        defaultValue={props.default}
        step={props.step}
        min={props.min}
        max={props.max}
      />
    </Grid>
    <Grid item>
      <Typography>Yes</Typography>
    </Grid>
  </Grid>
);

export default DiscreteSlider;
