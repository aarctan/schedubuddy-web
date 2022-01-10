import { IconButton, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#167742",
    padding: theme.spacing(1),
    textAlign: "right",
  },
  iconButton: {
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
    </footer>
  );
};

export default Footer;
