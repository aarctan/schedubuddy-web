import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#167742",
    padding: theme.spacing(1),
    textAlign: "center",
    align: "center",
  },
  iconButton: {
    padding: "4px",
  },
  logo: {
    maxWidth: 24,
    padding: "4px",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <IconButton
        aria-label="github-link"
        className={classes.iconButton}
        href="https://github.com/Exanut/schedubuddy-web"
      >
        <GitHubIcon fontSize="large" />
      </IconButton>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        align="center"
      >
        <Grid item>
          <img
            src="/discord-logo.png"
            alt="logo"
            className={classes.logo}
            align="center"
          />
        </Grid>
        <Grid item>
          <Typography variant="body2" align="center" color="textSecondary" component="p">
            Arctan#0001 for inquiries
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;