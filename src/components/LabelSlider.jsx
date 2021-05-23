import { Grid, Slider } from "@material-ui/core";

const marks = [
  { value: 10, label: "10" },
  { value: 30, label: "30" },
  { value: 100, label: "100" },
];

const DiscreteSlider = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            onChange={props.setShowLimit}
            valueLabelDisplay="auto"
            defaultValue={props.default}
            marks={marks}
            step={props.step}
            min={props.min}
            max={props.max}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DiscreteSlider;
