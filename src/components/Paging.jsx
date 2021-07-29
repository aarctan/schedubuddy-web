import Pagination from "@material-ui/core/Pagination";
import Stack from "@material-ui/core/Stack";
import { useMediaQuery } from "@material-ui/core";

export default function Paging(props) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Stack spacing={2}>
      <Pagination
        style={{ marginBottom: "2%" }}
        variant="outlined"
        color="primary"
        size={isSmallScreen ? "small" : "medium"}
        count={props.pages}
        onChange={props.onChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
