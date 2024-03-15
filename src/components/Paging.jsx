import { Pagination, useMediaQuery } from "@mui/material";

export default function Paging(props) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Pagination
      sx={{ marginBottom: 1 }}
      variant="outlined"
      color="primary"
      size={isSmallScreen ? "small" : "medium"}
      siblingCount={isSmallScreen ? 0 : 1}
      count={props.pages}
      onChange={props.onChange}
      showFirstButton
      showLastButton
    />
  );
}
