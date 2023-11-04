import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography, IconButton, styled } from "@mui/material";

const UnstyledFooter = ({ className }) => {
  return (
    <footer className={className}>
      <IconButton
        color="secondary"
        sx={{ padding: "4px" }}
        aria-label="github-link"
        href="https://github.com/Exanut/schedubuddy-web"
      >
        <GitHubIcon fontSize="large" />
      </IconButton>
      <Typography variant="caption" color="secondary">
        <div>Last updated Nov 3</div>
      </Typography>
    </footer>
  );
};

const Footer = styled(UnstyledFooter)(({ theme }) => ({
  backgroundColor: "#167742",
  padding: theme.spacing(1),
  textAlign: "center",
  align: "center",
}));

export default Footer;
