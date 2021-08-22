import { Grid, InputLabel, makeStyles } from "@material-ui/core";
import BasicSelect from "./BasicSelect";

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.primary,
    whiteSpace: "normal",
  },
}));

const MiniSelect = ({ label, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <Grid item xs={12} lg={6}>
        <InputLabel className={classes.label}>{label}</InputLabel>
      </Grid>
      <Grid item xs={12} lg={4}>
        <BasicSelect {...rest} />
      </Grid>
    </Grid>
  );
};

export default MiniSelect;
