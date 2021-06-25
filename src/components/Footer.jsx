import { makeStyles } from "@material-ui/core/styles";
import { Divider, IconButton, Link, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

// const Copyright = () => {
//   const date = new Date();
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {`Copyright © ${date.getFullYear()} ScheduleBuddy. All Rights Reserved`}
//     </Typography>
//   );
// };

const LinkMo = (
  <Link href="https://github.com/Exanut" color="inherit">
    Muhammad Usman
  </Link>
);

const LinkMatt = (
  <Link href="https://github.com/mdziubin" color="inherit">
    Matthew Dziubina
  </Link>
);

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(1),
  },
  footer: {
    backgroundColor: "#167742",
    padding: theme.spacing(1, 0),
    textAlign: "center",
  },
  iconButton: {
    padding: "4px",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Divider className={classes.divider} />
      {/* <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography> */}
      <Typography variant="body2" align="center" color="textSecondary" component="p">
        Created by {LinkMo} and {LinkMatt}
      </Typography>
      <IconButton
        aria-label="github-link"
        className={classes.iconButton}
        href="https://github.com/Exanut/schedubuddy-web"
      >
        <GitHubIcon />
      </IconButton>
      {/* <Copyright /> */}
    </footer>
  );
};

export default Footer;
