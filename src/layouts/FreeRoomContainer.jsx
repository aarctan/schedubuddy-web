import { ExpandLess, ExpandMore, LockClockOutlined } from "@mui/icons-material";
import {
  CardContent,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";

const RoomList = ({ rooms }) => {
  return (
    <List dense component="div" disablePadding sx={{ pl: 4 }}>
      {rooms.map((room) => (
        <Fragment key={room.name}>
          <ListItem>
            <ListItemText primary={room.name} />
            {!room.class_after && (
              <ListItemIcon>
                <Tooltip title="No classes scheduled later than the start time, room may be locked">
                  <LockClockOutlined />
                </Tooltip>
              </ListItemIcon>
            )}
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default function FreeRoomContainer({ roomData }) {
  const [open, setOpen] = useState({});

  const handleCollapseClick = (e) => {
    const name = e.currentTarget.getAttribute("name"); // Name is a custom attribute
    setOpen({ ...open, [name]: !open[name] });
  };

  if (roomData.length === 0) {
    return (
      <CardContent>
        <Typography variant="h5">
          <div align="center">No rooms to display</div>
        </Typography>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <List
        aria-labelledby="nested-list-subheader"
        dense
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Building / Room
          </ListSubheader>
        }
      >
        {roomData.map(([building, rooms]) => (
          <Fragment key={building}>
            <ListItemButton name={building} onClick={handleCollapseClick}>
              <ListItemText primary={building} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />
            <Collapse in={Boolean(open[building])} timeout="auto" unmountOnExit>
              <RoomList rooms={rooms} />
            </Collapse>
          </Fragment>
        ))}
      </List>
    </CardContent>
  );
}
