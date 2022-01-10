import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

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
            This app is currently under construction and will be working again when
            updated class information is available.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
