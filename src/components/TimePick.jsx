import MiniSelect from "./Input/MiniSelect";

const options = [
  { label: "8 AM", value: 0 },
  { label: "9 AM", value: 1 },
  { label: "10 AM", value: 2 },
  { label: "11 AM", value: 3 },
  { label: "12 PM", value: 4 },
  { label: "1 PM", value: 5 },
  { label: "2 PM", value: 6 },
];

const TimePick = (props) => (
  <MiniSelect isObj label="Preferred start time" options={options} {...props} />
);

export default TimePick;
