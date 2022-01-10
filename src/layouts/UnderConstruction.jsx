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
            This app has underwent a major change and may have bugs. If you catch any,
            please create an issue on github.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
