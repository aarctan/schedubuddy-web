import { IconButton, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";

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

      <IconButton
        aria-label="github-link"
        className={classes.iconButton}
        href="https://www.instagram.com/aaarctan/"
      >
        <InstagramIcon fontSize="large" />
      </IconButton>
    </footer>
  );
};

export default Footer;
