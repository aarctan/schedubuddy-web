import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary">
        <Toolbar>
          <Typography
            color="inherit"
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Thank you for using schedubuddy. This website will go down on May 25, 2022.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
