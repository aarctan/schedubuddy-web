import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appbar: {
    position: "absolute",
    color: "secondary",
    alignItems: "center",
  },
  typography: {
    flexGrow: 1,
    textAlign: "center",
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="secondary">
        <Toolbar>
          <Typography color="inherit" variant="h6" className={classes.typography}>
            Thank you for using schedubuddy. This website will go down on May 25, 2022.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
