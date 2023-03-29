import { Apartment, ContentPasteSearchOutlined, EventNote } from "@mui/icons-material";
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
        label="Scheduler"
        value="scheduleBuilder"
      />
      <Tab
        disableRipple
        icon={<Apartment fontSize="large" />}
        label="Occupancy"
        value="occupancyViewer"
      />
      <Tab
        disableRipple
        icon={<ContentPasteSearchOutlined fontSize="large" />}
        label="Finder"
        value="occupancyFinder"
      />
    </TabList>
  );
};

const FormSwitcher = styled(UnstyledFormSwitcher)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export default FormSwitcher;
