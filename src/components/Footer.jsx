import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;
const LAST_UPDATED_URL = `${BASE_URL}api/v1/last-updated`;
const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };

function unixTimeToDate(unixTime) {
  return new Date(1000 * unixTime); // Unix epoch time is seconds, javascript date uses ms
}

function dateToDisplayString(date) {
  return date.toLocaleString("en-US", DATE_OPTIONS);
}

const UnstyledFooter = ({ className }) => {
  const [lastUpdated, setLastUpdated] = useState("Unknown");

  useEffect(() => {
    fetch(LAST_UPDATED_URL)
      .then((res) => res.json())
      .then((json) => setLastUpdated(unixTimeToDate(json.lastUpdated)))
      .catch((err) => console.log(`Error fetching last updated: ${err}`));
  }, []);

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
        <div>{`Last updated ${dateToDisplayString(lastUpdated)}`}</div>
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
