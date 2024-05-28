import { Box, Typography } from "@mui/material";

const DeprecationNotice = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      textAlign="center"
    >
      {/* <img src="/favicon.ico" alt="Favicon" /> */}
      <Typography variant="h5" color="secondary">
        Schedubuddy was a free open source app built by undergrad students at the
        University of Alberta. For three years, it helped thousands of students navigate
        academic schedules, view classes in buildings, and explore related activities. Due
        to tightened measures by the university, we are no longer able to serve the same
        functionality.
        <br />
        <br />
        The source code remains available as an archive. We thank all contributors and
        users for your interest and support.
      </Typography>
    </Box>
  );
};

export default DeprecationNotice;
