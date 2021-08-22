import MiniSelect from "./Input/MiniSelect";

const options = [
  { label: "1 hr", value: 0 },
  { label: "2 hrs", value: 1 },
  { label: "3 hrs", value: 2 },
  { label: "4 hrs", value: 3 },
  { label: "5 hrs", value: 4 },
];

const MarathonPref = (props) => (
  <MiniSelect
    isObj
    label="Preferred hours of class before a break"
    options={options}
    {...props}
  />
);

export default MarathonPref;
