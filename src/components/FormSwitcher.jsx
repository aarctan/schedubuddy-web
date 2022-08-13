import { Apartment, EventNote } from "@mui/icons-material";
import { Box, IconButton, styled, Tooltip } from "@mui/material";

function UnstyledFormSwitcher({ className, onClick, view }) {
  return (
    <Box className={className}>
      <Tooltip placement="top" title="Schedule Builder">
        <IconButton
          color={view === "schedule" ? "primary" : "default"}
          name="schedule"
          onClick={onClick}
          size="large"
          className="TabButton"
        >
          <EventNote fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip placement="top" title="Room Schedule">
        <IconButton
          color={view === "room" ? "primary" : "default"}
          name="room"
          onClick={onClick}
          size="large"
          className="TabButton"
        >
          <Apartment fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

const FormSwitcher = styled(UnstyledFormSwitcher)({
  display: "flex",
  justifyContent: "space-evenly",

  ".TabButton": {
    paddingTop: 0,
  },
});

export default FormSwitcher;
