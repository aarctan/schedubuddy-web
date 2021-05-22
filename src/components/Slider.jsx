import { Box, Grid, Slider, Typography } from "@material-ui/core";

const DiscreteSlider = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>No</Typography>
        </Grid>
        <Grid item xs>
          <Slider defaultValue={1} step={1} min={0} max={2} />
        </Grid>
        <Grid item>
          <Typography>Yes</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DiscreteSlider;
