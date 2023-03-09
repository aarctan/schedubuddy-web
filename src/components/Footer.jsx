import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

import { IconButton } from "@mui/material";
import { styled } from "@mui/material";

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

      <IconButton
        color="secondary"
        sx={{ padding: "4px" }}
        aria-label="github-link"
        href="https://www.instagram.com/aaarctan/"
      >
        <InstagramIcon fontSize="large" />
      </IconButton>
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
