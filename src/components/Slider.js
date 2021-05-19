import { Box, Grid, Slider, Typography } from "@material-ui/core";

const DiscreteSlider = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography id="continuous-slider" gutterBottom>
        Morning Class Preference
      </Typography>
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
    </Box>
  );
};

export default DiscreteSlider;
