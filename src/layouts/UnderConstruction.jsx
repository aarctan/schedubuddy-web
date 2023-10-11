import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary">
        <Toolbar variant="dense">
          <Typography
            color="inherit"
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            The catalog recently updated - some class times or locations may have changed
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
