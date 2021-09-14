import MiniSelect from "components/FormInputs/MiniSelect";

const options = [
  { label: "8 AM", value: "8:00 AM" },
  { label: "9 AM", value: "9:00 AM" },
  { label: "10 AM", value: "10:00 AM" },
  { label: "11 AM", value: "11:00 AM" },
  { label: "12 PM", value: "12:00 PM" },
  { label: "1 PM", value: "1:00 PM" },
  { label: "2 PM", value: "2:00 PM" },
];

const TimePick = (props) => (
  <MiniSelect isObj label="Preferred start time" options={options} {...props} />
);

export default TimePick;
