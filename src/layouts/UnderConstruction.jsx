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
            The catalog recently updated - some classes may currently be missing here
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
