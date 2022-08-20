import { Apartment, EventNote } from "@mui/icons-material";
import { Box, styled, Tab, Tabs } from "@mui/material";

function UnstyledFormSwitcher({ className, onClick, view }) {
  return (
    <Box className={className}>
      <Tabs>
        <Tab
          color={view === "room" ? "primary" : "default"}
          className="TabButton"
          name="schedule"
          label="Scheduler Builder"
          icon={
            <EventNote
              fontSize="large"
              color={view === "schedule" ? "secondary" : "default"}
            />
          }
          onClick={onClick}
          disableRipple
        />
        <Tab
          className="TabButton"
          name="room"
          label="Occupancy Viewer"
          color="primary"
          backgroundColor="primary"
          textColor="secondary"
          icon={
            <Apartment
              fontSize="large"
              color={view === "room" ? "secondary" : "default"}
            />
          }
          onClick={onClick}
          disableRipple
          
        />
      </Tabs>
    </Box>
  );
}

const FormSwitcher = styled(UnstyledFormSwitcher)({
  display: "flex",
  justifyContent: "center",

  ".TabButton": {
    paddingTop: 0,
  },
});

export default FormSwitcher;
