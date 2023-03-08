import { TabContext, TabPanel } from "@mui/lab";
import { Box, Card, CardContent, Grid } from "@mui/material";
import FormSwitcher from "components/FormSwitcher";
import LoadingCardContent from "components/LoadingCard";
import { FormProvider } from "context/Form";
import { Form as RoomForm } from "forms/Room";
import { Form as ScheduleForm } from "forms/Schedule";
import ScheduleContainer from "layouts/ScheduleContainer";
import UnderConstruction from "./UnderConstruction";
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

  // Room lookup
  roomTerm: "",
  room: null,
};

// Initial generate schedule response state
const blankResponse = {
  objects: {
    aliases: [],
    schedules: [],
    errorMessage: "No schedules to display",
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
  const [response, setResponse] = useState(blankResponse);
  const [courseOrder, setCourseOrder] = useState([]);
  const [view, setView] = useState("schedule");
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
    const { scheduleTerm, courses, evening, online, startPref, consecPref, resultSize } =
      values;

    try {
      setLoading(true);
      setCourseOrder(courses.map((course) => course.course)); // Set the courseId order for color parity between autocomplete chips and schedule canvas
      const course_ids = courses.map((course) => course.course).join(",");
      const eveningClassesBit = evening === true ? "1" : "0";
      const onlineClassesBit = online === true ? "1" : "1";
      const prefsStr = `&evening=${eveningClassesBit}&online=${onlineClassesBit}&start=${startPref}&consec=${consecPref}&limit=${resultSize}`;
      const req_url = `${API_URL}/api/v1/gen-schedules/?term=${scheduleTerm}&courses=[${course_ids}]${prefsStr}`;
      const data = await fetch(req_url).then((res) => res.json());
      setResponse(data);
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
      setResponse(data);
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

  return (
    <>
      <div>
        <UnderConstruction />
      </div>
      <Box mt={10}>
        <TabContext value={view}>
          <FormSwitcher onChange={handleTabClick} view={view} />
          <Grid container spacing={2}>
            <FormProvider initialValues={initialValues}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <TabPanel value="schedule">
                      <ScheduleForm terms={terms} onSubmit={handleScheduleSubmit} />
                    </TabPanel>
                    <TabPanel value="room">
                      <RoomForm terms={terms} onSubmit={handleRoomSubmit} />
                    </TabPanel>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  {loading ? (
                    <LoadingCardContent />
                  ) : (
                    <ScheduleContainer
                      aliases={response.objects.aliases}
                      courseOrder={courseOrder}
                      schedules={response.objects.schedules}
                      errorMessage={response.objects.errorMessage}
                    />
                  )}
                </Card>
              </Grid>
            </FormProvider>
          </Grid>
        </TabContext>
      </Box>
    </>
  );
};

export default Main;
