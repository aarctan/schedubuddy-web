import * as React from "react";
import Pagination from "@material-ui/core/Pagination";
import Stack from "@material-ui/core/Stack";

export default function Paging(props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.pages}
        onChange={props.onChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
