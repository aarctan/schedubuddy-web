import { Box, Card, CardContent, Grid } from "@mui/material";
import FormSwitcher from "components/FormSwitcher";
import LoadingCardContent from "components/LoadingCard";
import { FormProvider } from "context/Form";
import { Form as RoomForm } from "forms/Room";
import { Form as ScheduleForm } from "forms/Schedule";
import ScheduleContainer from "layouts/ScheduleContainer";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const initialValues = {
  // Schedule builder
  scheduleTerm: "",
  courses: [],
  evening: false,
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

  // Turn the terms into option format and sort
  const options = data.objects.map((term) => ({
    label: term.termTitle,
    value: term.term,
  }));
  const sortedTerms = options.sort((a, b) => (a.term > b.term ? 1 : -1));
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

  const handleTabClick = (e) => {
    setView(e.currentTarget.name);
  };

  const handleScheduleSubmit = async (values) => {
    const { scheduleTerm, courses, evening, online, startPref, consecPref, resultSize } =
      values;

    try {
      setLoading(true);
      setCourseOrder(courses.map((course) => course.course)); // Set the courseId order for color parity between autocomplete chips and schedule canvas
      const course_ids = courses.map((course) => course.course).join(",");
      const eveningClassesBit = evening === true ? "1" : "0";
      const onlineClassesBit = online === true ? "1" : "0";
      //const prefsStr = `[${eveningClassesBit},${onlineClassesBit},${startPref},${consecPref},${resultSize}]`;
      //const req_url = `${API_URL}/api/v1/gen-schedules/?term=${scheduleTerm}&courses=[${course_ids}]&prefs=${prefsStr}`;
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
      setCourseOrder(
        data.objects.schedules[0].map((courseObj) => courseObj.objects.course)
      );
    } catch (err) {
      console.log(`Error fetching room schedules: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <FormProvider initialValues={initialValues}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <FormSwitcher onClick={handleTabClick} view={view} />
                {view === "schedule" && (
                  <ScheduleForm terms={terms} onSubmit={handleScheduleSubmit} />
                )}
                {view === "room" && (
                  <RoomForm terms={terms} onSubmit={handleRoomSubmit} />
                )}
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
    </Box>
  );
};

export default Main;
