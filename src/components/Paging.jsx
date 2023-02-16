import { Pagination, Stack, useMediaQuery } from "@mui/material";

export default function Paging(props) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ marginBottom: "2%" }}
        variant="outlined"
        color="primary"
        size={isSmallScreen ? "small" : "medium"}
        siblingCount={isSmallScreen ? 0 : 1}
        count={props.pages}
        onChange={props.onChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
