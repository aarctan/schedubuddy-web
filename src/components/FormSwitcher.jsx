import { Apartment, EventNote } from "@mui/icons-material";
import { TabList } from "@mui/lab";
import { styled } from "@mui/material";
import Tab from "@mui/material/Tab";

const UnstyledFormSwitcher = ({ className, onChange }) => {
  return (
    <TabList
      aria-label="Schedule tools"
      centered
      className={className}
      indicatorColor="secondary"
      onChange={onChange}
      textColor="secondary"
    >
      <Tab
        disableRipple
        icon={<EventNote fontSize="large" />}
        label="Schedule Builder"
        value="schedule"
      />
      <Tab
        disableRipple
        icon={<Apartment fontSize="large" />}
        label="Occupancy Viewer"
        value="room"
      />
    </TabList>
  );
};

const FormSwitcher = styled(UnstyledFormSwitcher)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export default FormSwitcher;
