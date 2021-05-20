import { Box, Grid, Slider, Typography } from "@material-ui/core";

const DiscreteSlider = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>0</Typography>
        </Grid>
        <Grid item xs>
          <Slider defaultValue={0} step={10} min={0} max={100} />
        </Grid>
        <Grid item>
          <Typography>10</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DiscreteSlider;
