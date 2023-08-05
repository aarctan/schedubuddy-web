import { TabContext, TabPanel } from "@mui/lab";
import { Card, CardContent, Grid } from "@mui/material";
import FormSwitcher from "components/FormSwitcher";
import LoadingCardContent from "components/LoadingCard";
import { FormProvider } from "context/Form";
import { Form as FreeRoomForm } from "forms/FreeRoom";
import { Form as RoomForm } from "forms/Room";
import { Form as ScheduleForm } from "forms/Schedule";
import FreeRoomContainer from "layouts/FreeRoomContainer";
import ScheduleContainer from "layouts/ScheduleContainer";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const initialValues = {
  // Schedule builder
  scheduleTerm: "",
  courses: [],
  evening: true,
  online: false,
  showNames: false,
  startPref: "10:00 AM",
  consecPref: 2,
  resultSize: 30,
  blacklist: [],

  // Room schedule lookup
  roomTerm: "",
  room: null,

  // Free room lookup
  freeRoomTerm: "",
  freeRoomDay: "",
  freeRoomStartTime: "",
  freeRoomEndTime: "",
};

// Initial generate schedule response state
const blankResponse = {
  objects: {
    aliases: [],
    schedules: [],
    errmsg: "No schedules to display",
  },
};

/**
 * Fetch term options for forms
 * @returns {Promise<Array>}
 */
const fetchTerms = async () => {
  const response = await fetch(`${API_URL}/api/v1/terms`);
  const data = await response.json();

  // Turn the terms into option format and sort. Remove unused terms.
  const options = data.objects
    .filter((term) =>
      ["Winter", "Fall", "Summer", "Spring"].some((substring) =>
        term.termTitle.includes(substring)
      )
    )
    .filter((term) => !term.termTitle.includes("Continuing"))
    .map((term) => ({
      label: term.termTitle,
      value: term.term,
    }));
  const sortedTerms = options.sort((a, b) => (a.value > b.value ? 1 : -1));
  return sortedTerms;
};

const Main = () => {
  const [terms, setTerms] = useState([]);
  const [scheduleResponse, setScheduleResponse] = useState(blankResponse); // ScheduleBuilder and OccupancyViewer result state
  const [freeRooms, setFreeRooms] = useState([]);
  const [courseOrder, setCourseOrder] = useState([]);
  const [view, setView] = useState("scheduleBuilder");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTerms()
      .then((options) => setTerms(options))
      .catch((err) => console.log(`Error fetching terms: ${err}`));
  }, []);

  const handleTabClick = (_e, value) => {
    setView(value);
  };

  const handleScheduleSubmit = async (values) => {
    const { scheduleTerm, courses, evening, online, startPref, consecPref, resultSize, blacklist } =
      values;

    try {
      setLoading(true);
      setCourseOrder(courses.map((course) => course.course)); // Set the courseId order for color parity between autocomplete chips and schedule canvas
      const course_ids = courses.map((course) => course.course).join(",");
      const eveningClassesBit = evening === true ? "1" : "0";
      const onlineClassesBit = online === true ? "1" : "1";
      let blacklist_ids = Object.keys(blacklist).filter(id => blacklist[id] === true);
      blacklist_ids = blacklist_ids.join(",");
      const prefsStr = `&evening=${eveningClassesBit}&online=${onlineClassesBit}&start=${startPref}&consec=${consecPref}&limit=${resultSize}&blacklist=[${blacklist_ids}]`;
      const req_url = `${API_URL}/api/v1/gen-schedules/?term=${scheduleTerm}&courses=[${course_ids}]${prefsStr}`;
      const data = await fetch(req_url).then((res) => res.json());
      setScheduleResponse(data);
    } catch (err) {
      console.log(`Error fetching generated schedules: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSubmit = async (values) => {
    const { roomTerm, room } = values;

    try {
      setLoading(true);
      const req_url = `${API_URL}/api/v1/room-sched/?term=${roomTerm}&room=${room.location}`;
      const data = await fetch(req_url).then((res) => res.json());
      setScheduleResponse(data);
      const roomSchedule = data.objects.schedules[0].slice().sort((a, b) => {
        a = a.objects.course.split(" ");
        b = b.objects.course.split(" ");
        if (a[0] > b[0]) {
          return 1;
        } else if (a[0] === b[0]) {
          return a[1] > b[1];
        }
        return -1;
      });
      setCourseOrder(roomSchedule.map((courseObj) => courseObj.objects.course));
    } catch (err) {
      console.log(`Error fetching room schedules: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFreeRoomSubmit = async (values) => {
    const url = new URL(`${API_URL}/api/all-rooms-open`);
    url.searchParams.set("term", values.freeRoomTerm);
    url.searchParams.set("weekday", values.freeRoomDay);
    url.searchParams.set("starttime", values.freeRoomStartTime);
    url.searchParams.set("endtime", values.freeRoomEndTime);

    try {
      setLoading(true);
      const data = await fetch(url).then((res) => res.json());
      setFreeRooms(Object.entries(data.available_rooms)); // Building/RoomData key value pairs
    } catch (err) {
      console.log(`Error fetching free rooms: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Change right side card depending on tab
  let InfoCard;
  switch (view) {
    case "scheduleBuilder":
    case "occupancyViewer":
      InfoCard = (
        <ScheduleContainer
          aliases={scheduleResponse.objects.aliases}
          courseOrder={courseOrder}
          schedules={scheduleResponse.objects.schedules}
          errmsg={scheduleResponse.objects.errmsg}
        />
      );
      break;
    case "occupancyFinder":
      InfoCard = <FreeRoomContainer roomData={freeRooms} />;
      break;
    default:
      break;
  }

  return (
    <TabContext value={view}>
      <FormSwitcher onChange={handleTabClick} view={view} />
      <Grid container spacing={2}>
        <FormProvider initialValues={initialValues}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <TabPanel value="scheduleBuilder" sx={{ p: 1 }}>
                  <ScheduleForm terms={terms} onSubmit={handleScheduleSubmit} />
                </TabPanel>
                <TabPanel value="occupancyViewer" sx={{ p: 1 }}>
                  <RoomForm terms={terms} onSubmit={handleRoomSubmit} />
                </TabPanel>
                <TabPanel value="occupancyFinder" sx={{ p: 1 }}>
                  <FreeRoomForm terms={terms} onSubmit={handleFreeRoomSubmit} />
                </TabPanel>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>{loading ? <LoadingCardContent /> : InfoCard}</Card>
          </Grid>
        </FormProvider>
      </Grid>
    </TabContext>
  );
};

export default Main;
