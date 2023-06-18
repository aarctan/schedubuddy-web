import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
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
        aria-label="donate"
        href="https://www.buymeacoffee.com/schedubuddy"
      >
        <CreditCardOutlinedIcon fontSize="large" />
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
