import { InputLabel, makeStyles, useMediaQuery } from "@material-ui/core";
import BasicSelect from "./BasicSelect";

const useWideStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    alignItems: "center",
    color: theme.palette.text.primary,
    display: "flex",
    whiteSpace: "normal",
    width: "60%",
  },
  input: {
    width: "35%",
  },
}));

// Display label to the left of the input rather than embbed(default)
const InlineSelect = ({ label, ...rest }) => {
  const classes = useWideStyles();

  return (
    <div className={classes.root}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <BasicSelect className={classes.input} {...rest} />
    </div>
  );
};

const useCompactStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: theme.palette.text.primary,
    whiteSpace: "normal",
  },
}));

// Display label above the input rather than embbed(default)
const CompactSelect = ({ label, ...rest }) => {
  const classes = useCompactStyles();

  return (
    <div className={classes.root}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <BasicSelect {...rest} />
    </div>
  );
};

const MiniSelect = (props) => {
  const small = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  // Display different versions the select input depending on screen width
  return small ? <InlineSelect {...props} /> : <CompactSelect {...props} />;
};

export default MiniSelect;
