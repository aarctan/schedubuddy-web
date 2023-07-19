import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, styled } from "@mui/material";

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
        aria-label="discord-link"
        href="https://discord.gg/v4wmYQQBHN"
      >
        <img
          src="/discord-logo-yellow.png"
          alt="Discord Logo"
          style={{ width: "36px", height: "32px" }}
        />
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
